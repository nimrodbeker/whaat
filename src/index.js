import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import App from './App'
import {configureStore} from "./redux/configure";
import 'react-mdl/extra/material.min';
import 'react-mdl/extra/css/material.blue_grey-amber.min.css';
import 'materialize-css/dist/css/materialize.min.css'
import './index.css';
import './extension/connection'

export const store = configureStore();

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);