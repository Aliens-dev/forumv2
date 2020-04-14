import React from 'react';
import ReactDOM from 'react-dom';
import HomeRoutes from './routes/HomeRoutes';
import reducers from './reducers';
import {createStore , applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

const App =() => {
    return (
        <div>
            <HomeRoutes />
        </div>
    )
}


ReactDOM.render(
    <Provider store={createStore(reducers,applyMiddleware(thunk))}>
        <App />
    </Provider>
    ,
    document.getElementById('app')
)