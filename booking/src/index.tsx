import * as React from 'react';
import * as ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-dates/lib/css/_datepicker.css';
import './index.css';

import * as ReactGA from 'react-ga';

import App from './App';

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize('UA-67233667-4');
}

ReactDOM.render(<App />, document.getElementById('root'));
