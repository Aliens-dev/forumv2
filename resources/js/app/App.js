import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import HomeRoutes from './routes/HomeRoutes';
import reducers from './reducers';
import {createStore , applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';

const store = createStore(reducers,applyMiddleware(thunk));
const App =() => {
    useEffect(()=> {
        let data = JSON.parse(localStorage.getItem('data')) || null;
        store.dispatch({
            type: 'LOAD_STATE',
            payload: data,
        });
    },[]);
    return (
        <Router>
            <Navbar />
            <HomeRoutes />
        </Router>
    )
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    ,
    document.getElementById('app')
)