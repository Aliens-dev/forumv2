import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Home from '../pages/Home';
import Forum from '../pages/Forum';
import Post from '../pages/Post';
import NewPost from '../pages/NewPost';
import Login from "../pages/Login";

const HomeRoutes = () => {

    return (
            <Switch>
                <Route path="/" exact render={ e => <Home {...e} />} />
                <Route path="/login" exact render={ e => <Login {...e} />} />
                <Route path="/forums/:forumId" exact render={e => <Forum {...e} />} />
                <Route path="/forums/:forumId/new" exact render={e => <NewPost {...e} />} />
                <Route path="/forums/:forumId/posts/:postId" exact render={e=> <Post {...e} /> } />
                <Route path="*" render={()=> <div>Error!</div>} />
            </Switch>
    )
}
export default HomeRoutes;