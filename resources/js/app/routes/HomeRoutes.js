import React, {useEffect} from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Home from '../pages/Home';
import Forum from '../pages/Forum';
import Post from '../pages/Post';
import NewPost from '../pages/NewPost';
import Login from "../pages/Login";
import ProtectedRoute from "../pages/ProtectedRoute";
import EditPost from "../pages/EditPost";
import EditReply from "../pages/EditReply";
import {connect} from "react-redux";
import { loadState } from '../actions';
import Alert from '../components/Alert';

const HomeRoutes = (props) => {
    useEffect(()=> {
        props.loadState();
    },[]);
    return (
           <div>
                <Switch>
                    <Route path="/" exact render={ e => <Home {...e} />} />
                    <Route path="/login" exact render={ e => <Login {...e} />} />
                    <Route path="/forums/:forumId" exact render={e => <Forum {...e} />} />
                    <ProtectedRoute path="/forums/:forumId/new" exact render={e => <NewPost {...e} />} />
                    <Route path="/forums/:forumId/posts/:postId" exact render={e=> <Post {...e} /> } />
                    <ProtectedRoute path="/forums/:forumId/posts/:postId/edit" exact render={e => <EditPost {...e} />} />
                    <ProtectedRoute path="/forums/:forumId/posts/:postId/reply/:replyId" exact render={e => <EditReply {...e} />} />
                    <Route path="*" render={()=> <div>Error!</div>} />
                </Switch>
                {props.alert.isSetMessage && <Alert />}
           </div>
    )
}
const mapStateToProps = (state) => {
    return {
        auth:state.auth,
        alert : state.alert,
    }
};
export default connect(mapStateToProps , { loadState })(HomeRoutes);