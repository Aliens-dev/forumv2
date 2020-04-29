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
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { addNotification } from '../actions';


const HomeRoutes = (props) => {
    useEffect(()=> {
        props.loadState();
    },[]);
    useEffect(()=> {
        if(props.auth.is_Logged) {
            
            const echo = new Echo({
                broadcaster: 'pusher',
                key: '7a2212a47d236d1d98f4',
                cluster: 'eu',
                forceTLS: false,
                auth: {
                    headers: {
                        Authorization : "Bearer " + props.auth.token,
                    },
                },
            });
            echo.private('replies.'+props.auth.user.id)
                .listen('UserReplied', e=> {
                    props.addNotification(e);
            })
        }
    },[props.auth]);
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
export default connect(mapStateToProps , { loadState,addNotification })(HomeRoutes);