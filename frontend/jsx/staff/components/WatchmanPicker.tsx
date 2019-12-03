import { connect } from 'react-redux';

import { State } from '~/redux/store';

import { selectStaffMembersWatchmenFirst } from '../selectors';
import { Picker } from './Picker';

const mapStateToProps = (state: State) => ({
  members: selectStaffMembersWatchmenFirst(state),
});

export default connect(mapStateToProps)(Picker);
