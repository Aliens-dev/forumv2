import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Home from '../pages/Home';
import Forum from '../pages/Forum';
import Navbar from '../components/Navbar';

const HomeRoutes = () => {

    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="*" component={()=> <div>Error 404</div>} />>
            </Switch>
        </Router>
    )
}
export default HomeRoutes;