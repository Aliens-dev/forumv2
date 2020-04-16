import React from 'react';
import ReactDOM from 'react-dom';
import HomeRoutes from './routes/HomeRoutes';
import reducers from './reducers';
import {createStore , applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';

const App =() => {
    return (
        <Router>
            <Navbar />
            <HomeRoutes />
        </Router>
    )
}


ReactDOM.render(
    <Provider store={createStore(reducers,applyMiddleware(thunk))}>
        <App />
    </Provider>
    ,
    document.getElementById('app')
)