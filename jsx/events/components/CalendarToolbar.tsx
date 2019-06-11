import React from 'react';

/// <reference path="../../@types/react-big-calendar/lib/utils/constants.d.ts" />
import { navigate } from 'react-big-calendar/lib/utils/constants';

import { ToolbarProps, Navigate, View } from 'react-big-calendar';

class CalendarToolbar extends React.Component<ToolbarProps> {
  render() {
    let { label } = this.props;

    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          <button
            type="button"
            onClick={this.navigate.bind(null, navigate.TODAY)}
          >
            Сегодня
          </button>
          <button
            type="button"
            onClick={this.navigate.bind(null, navigate.PREVIOUS)}
          >
            Назад
          </button>
          <button
            type="button"
            onClick={this.navigate.bind(null, navigate.NEXT)}
          >
            Вперёд
          </button>
        </span>

        <span className="rbc-toolbar-label">{label}</span>

        <span className="rbc-btn-group">{this.viewNamesGroup()}</span>
      </div>
    );
  }

  navigate = (action: Navigate) => {
    this.props.onNavigate(action);
  };

  view = (view: View) => {
    this.props.onView(view);
  };

  viewNamesGroup() {
    let viewNames = this.props.views as View[];
    const view = this.props.view;

    const messages: { [key: string]: string } = {
      month: 'Месяц',
      week: 'Неделя',
      day: 'День',
      agenda: 'Адженда',
    };

    if (viewNames.length > 1) {
      return viewNames.map(name => (
        <button
          type="button"
          key={name}
          className={view === name ? 'rbc-active' : ''}
          onClick={this.view.bind(null, name)}
        >
          {messages[name]}
        </button>
      ));
    }
  }
}

export default CalendarToolbar;
