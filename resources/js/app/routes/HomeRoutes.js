import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Home from '../pages/Home';
import Forum from '../pages/Forum';
import Post from '../pages/Post';

const HomeRoutes = () => {

    return (
            <Switch>
                <Route path="/" exact render={ e => <Home {...e} />} />
                <Route path="/forums/:forumId" exact render={e => <Forum {...e} />} />
                <Route path="/forums/:forumId/posts/:postId" exact render={e=> <Post {...e} /> } />
                <Route path="*" render={()=> <div>Error!</div>} />
            </Switch>
    )
}
export default HomeRoutes;