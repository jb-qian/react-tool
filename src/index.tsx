import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducer from './redux/reducers';

import './less/index.less';

import Router from './Router';

//创建store
const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
	<Provider store={ store }>
		<Router />
	</Provider>,
	document.getElementById('root') as HTMLElement
);