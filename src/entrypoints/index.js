import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Pedals from '../components/Pedals';
import WelcomeScreen from '../components/WelcomeScreen';


ReactDOM.render(
    <Router history={createBrowserHistory()}>
        <Switch>
            <Route path="/" component={WelcomeScreen}/>
            <Route path="/pedals" component={Pedals}/>
            <Redirect to="/"/>
        </Switch>
    </Router>
    , document.getElementById('root'));