import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './less/index.less';

import Router from './Router';

ReactDOM.render(
  <Router />,
  document.getElementById('root') as HTMLElement
);