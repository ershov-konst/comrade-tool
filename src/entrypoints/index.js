import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { createHashHistory } from 'history';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import usb from '../lib/usb';
import deviceReducer from '../ducks/device';
import Pedals from '../components/Pedals';
import WelcomeScreen from '../components/WelcomeScreen';
import {
    SCREEN_WELCOME,
    SCREEN_PEDALS
} from '../lib/constants';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const history = createHashHistory();
const store = createStore(
    combineReducers({
        device: deviceReducer
    }),
    {},
    composeEnhancers(applyMiddleware(thunk))
);

usb(store, history);

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route exact={true} path={SCREEN_WELCOME}>
                    <WelcomeScreen/>
                </Route>
                <Route path={SCREEN_PEDALS}>
                    <Pedals/>
                </Route>
                <Redirect to={SCREEN_WELCOME}/>
            </Switch>
        </HashRouter>
    </Provider>
    , document.getElementById('root'));