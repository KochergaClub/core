import {
  observable,
  action,
  computed,
  runInAction,
  configure,
  autorun,
} from 'mobx';
import moment from 'moment';

import { GoogleLoginResponse } from 'react-google-login';

const server = 'https://api.kocherga.club';

configure({ enforceActions: true });

export type Room = string;
type Time = string;
type Date = moment.Moment;

class AuthStore {
  @observable token: string | null = null;
  @observable email: string | null = null;

  rootStore: MainStore;

  constructor(rootStore: MainStore) {
    this.rootStore = rootStore;

    const token = window.localStorage.getItem('auth.jwt_token');
    const email = window.localStorage.getItem('auth.email');
    this.token = token;
    this.email = email;
    this.checkAuth();
  }

  async checkResponse(response: Response) {
    if (response.status < 400) {
      return;
    }
    this.checkAuth();

    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.startsWith('application/json')) {
      const body = await response.text();
      throw new Error('Error: ' + body);
    }
    throw new Error('Bad server response');
  }

  parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  @action
  async auth(googleUser: GoogleLoginResponse) {
    const googleTokenId = googleUser.getAuthResponse().id_token;
    const response = await fetch(`${server}/auth/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: googleTokenId,
        team: 'any',
      }),
    });
    await this.checkResponse(response);
    const body = await response.json();

    if (!body.jwt_token) {
      throw new Error('Expected to find jwt_token in body');
    }

    this.setTokenAndEmail(body.jwt_token, this.parseJwt(body.jwt_token).email);
  }

  @action
  setTokenAndEmail(token: string, email: string) {
    this.token = token;
    this.email = email;
    window.localStorage.setItem('auth.jwt_token', token);
    window.localStorage.setItem('auth.email', email);
  }

  async checkAuth() {
    if (!this.token) {
      return; // no token -> nothing to check
    }
    const response = await fetch(`${server}/auth/check`, {
      headers: {
        Authorization: `JWT ${this.token}`,
      },
    });
    if (response.status === 200) {
      // ok!
      return;
    }
    this.logout(); // our token is invalid, let's stop everything then
  }

  @action
  logout() {
    this.token = null;
    this.email = null;
    window.localStorage.removeItem('auth.jwt_token');
    window.localStorage.removeItem('auth.email');
  }
}

const roomLimits: { [key: string]: [number, number] } = {
  Лекционная: [10, 40],
  ГЭБ: [6, 20],
  Китайская: [2, 12],
  Летняя: [1, 6],
};

export interface BookingJSON {
  room: Room | 'Неизвестная';
  start: string;
  end: string;
  people: number | null;
  event_id: string;
}

export class Booking {
  @observable eventId: string | null = null;
  @observable date: Date | null = null;
  @observable room: Room | null = null;
  @observable people: number | null = null;
  @observable startTime: Time | null = null;
  @observable endTime: Time | null = null;

  static fromJSON(json: BookingJSON): Booking {
    let booking = new Booking();

    booking.setRoom(json.room);

    const startMoment = moment(json.start);
    const endMoment = moment(json.end);
    booking.setDate(moment(startMoment).startOf('day'));

    const timeFromMoment = (m: moment.Moment) => {
      let time = m.format('HH:mm');
      if (time === '00:00') {
        time = '24:00';
      }
      return time;
    };
    booking.setStartTime(timeFromMoment(startMoment));
    booking.setEndTime(timeFromMoment(endMoment));

    booking.setPeople(json.people);

    booking.eventId = json.event_id;

    return booking;
  }

  asObject() {
    return {
      date: this.date!.format('YYYY-MM-DD'),
      room: this.room,
      people: this.people,
      startTime: this.startTime,
      endTime: this.endTime,
    };
  }

  @action
  setPeople(value: number | null) {
    this.people = value;
  }

  @action
  setRoom(value: Room) {
    this.room = value;
  }

  @action
  setDate(value: Date | null) {
    this.date = value;
  }

  @action
  setStartTime(value: Time | null) {
    this.startTime = value;
  }

  @action
  setEndTime(value: Time | null) {
    this.endTime = value;
  }

  @computed
  get dateString() {
    return this.date ? this.date.format('YYYY-MM-DD') : null;
  }

  @computed
  get isPeopleValid() {
    if (
      this.room &&
      (!this.people ||
        this.people < roomLimits[this.room][0] ||
        this.people > roomLimits[this.room][1])
    ) {
      return false;
    }
    return true;
  }

  @computed
  get isRoomValid(): boolean {
    return Boolean(this.room) && this.roomFitsPeople(this.room!);
  }

  roomFitsPeople(room: Room): boolean {
    return (
      Boolean(this.people) &&
      this.people! >= roomLimits[room][0] &&
      this.people! <= roomLimits[room][1]
    );
  }

  @computed
  get isDateValid(): boolean {
    return Boolean(this.date);
  }

  @computed
  get isTimeValid(): boolean {
    return Boolean(
      this.startTime && this.endTime && this.startTime !== this.endTime
    );
  }

  @computed
  get isValid(): boolean {
    return this.isRoomValid && this.isDateValid && this.isTimeValid;
  }

  conflictsByTime(b: Booking): boolean {
    const toMoment = (value: string | null) =>
      value ? moment(`2010-01-01 ${value}`, 'YYYY-MM-DD HH:mm') : null;
    const [st, et]: (moment.Moment | null)[] = [
      toMoment(this.startTime),
      toMoment(this.endTime),
    ];

    const [ost, oet]: moment.Moment[] = [
      toMoment(b.startTime) as moment.Moment,
      toMoment(b.endTime) as moment.Moment,
    ];

    if (!(st && et && st.isBefore(et))) {
      return false; // we've got bigger issues with this booking, let's just forget about conflicts for now
    }

    if (et.isSameOrBefore(ost)) {
      return false;
    }
    if (st.isSameOrAfter(oet)) {
      return false;
    }
    return true;
  }

  conflictsWithRoom(room: Room): boolean {
    return Boolean(this.room === room || room === 'Неизвестная');
  }

  conflictsWith(b: Booking): boolean {
    if (!this.conflictsByTime(b)) {
      return false;
    }
    if (b.room && this.conflictsWithRoom(b.room)) {
      return true;
    }
    return false;
  }
}

class BookingStore {
  rootStore: MainStore;

  @observable booking: Booking;

  @observable allBookings: Booking[];
  @observable myBookings: Booking[];

  @observable loadingMyBookings: boolean = false;
  @observable loadingAllBookings: boolean = false;

  constructor(rootStore: MainStore) {
    this.rootStore = rootStore;
    this.allBookings = [];
    this.myBookings = [];
    this.booking = new Booking();
    this.booking.setPeople(1);
    this.loadAllBookings();
    this.loadMyBookings();

    autorun(() => {
      if (this.rootStore.authStore.token) {
        this.loadMyBookings();
      }
    });
  }

  getRoomLimits(room: Room | null): [number, number] {
    if (!room) {
      return [1, 40];
    }
    return roomLimits[room];
  }

  @action
  async create() {
    // TODO - set UI flag
    const response = await fetch(`${server}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${this.rootStore.authStore.token}`,
      },
      body: JSON.stringify(
        Object.assign({}, this.booking.asObject(), {
          contact: this.rootStore.authStore.email,
        })
      ),
    });

    if (response.status === 400) {
      const json = await response.json();
      throw Error(json.message);
    }

    if (response.status > 400) {
      throw Error('Неизвестная ошибка');
    }

    this.loadMyBookings();
    this.loadAllBookings();
  }

  @computed
  get canCreate(): boolean {
    return Boolean(
      this.rootStore.authStore.token &&
        this.booking.isValid &&
        this.allBookings.filter(b => this.booking.conflictsWith(b)).length === 0
    );
  }

  @action
  async cancelBooking(eventId: string) {
    const response = await fetch(`${server}/bookings/${eventId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${this.rootStore.authStore.token}`,
      },
    });

    if (response.status === 400) {
      const json = await response.json();
      throw Error(json.message);
    }

    if (response.status > 400) {
      throw Error('Неизвестная ошибка');
    }

    this.loadMyBookings();
    this.loadAllBookings();
  }

  checkIfRoomIsPossible(room: Room): boolean {
    // Room is possible if it fits the selected number of people
    // and doesn't conflict with the existing bookings assuming the current date/time selection.
    const inLimits = this.booking.roomFitsPeople(room);

    const noConflicts =
      this.allBookings.filter(
        b => this.booking.conflictsByTime(b) && b.conflictsWithRoom(room)
      ).length === 0;

    const result = inLimits && noConflicts;
    return result;
  }

  @computed
  get possibleRooms(): Array<[Room, boolean]> {
    let result: Array<[Room, boolean]> = [];
    for (let room of Object.keys(roomLimits)) {
      const possible = this.checkIfRoomIsPossible(room);
      result.push([room, possible]);
    }
    return result;
  }

  @action
  async loadMyBookings() {
    this.loadingMyBookings = true;
    const token = this.rootStore.authStore.token;
    if (!token) {
      return; // can't load without a token
    }

    try {
      const response = await fetch(`${server}/my/bookings`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });

      if (response.status !== 200) {
        await this.rootStore.authStore.checkAuth();
        throw Error('Неизвестная ошибка');
      }

      const json = await response.json();

      runInAction(() => {
        this.myBookings = [];
        for (let entry of json) {
          const booking = Booking.fromJSON(entry);
          if (booking.date!.isBefore(moment(), 'day')) {
            continue; // don't show old bookings
          }
          this.myBookings.push(booking);
        }
      });
    } catch (e) {
      throw e;
    } finally {
      runInAction(() => (this.loadingMyBookings = false));
    }
  }

  @action
  async loadAllBookings() {
    this.loadingAllBookings = true;
    const date = this.booking.date
      ? this.booking.date.format('YYYY-MM-DD')
      : 'today';

    try {
      const response = await fetch(`${server}/bookings/${date}`);

      if (response.status !== 200) {
        throw Error('Неизвестная ошибка');
      }

      const json = await response.json();

      runInAction(() => {
        const result = [];
        for (let entry of json) {
          result.push(Booking.fromJSON(entry));
        }
        result.sort((a, b) => {
          if (a.room! < b.room!) {
            return -1;
          }
          if (a.room! > b.room!) {
            return 1;
          }
          return 0; // TODO - sort by time, Array.prototype.sort is not guaranteed to be stable
        });
        this.allBookings = result;
      });
    } catch (e) {
      throw e;
    } finally {
      runInAction(() => (this.loadingAllBookings = false));
    }
  }
}

export class MainStore {
  authStore: AuthStore;
  bookingStore: BookingStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.bookingStore = new BookingStore(this);
  }
}
