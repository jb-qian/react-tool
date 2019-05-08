import * as React from 'react'
import { HashRouter, Route } from 'react-router-dom';

import Index from './pages/Index';

import App from './App';
import List from './pages/List';

export default class Router extends React.Component{
    render (){
        return (
            <HashRouter>
                <Route path="/" exact component={ Index } />
                <Route path="/app" exact component={ App } />
                <Route path="/list" exact component={ List } />
            </HashRouter>
        )
    }
}