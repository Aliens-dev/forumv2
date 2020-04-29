import React, {useEffect} from 'react';
import '../assets/styles/HomeNavbarStyle.scss';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import {_Logout, _Refresh, seenNotification} from "../actions";

const Navbar = (props) => {
    const logout = () => {
        props._Logout(props.auth.token)
    }
    const renderNotification =  () =>{
        if(!props.notification.length) {
            return (
                <div className="nav-item ml-2 notification dropdown">
                    <i className="fa fa-bell" id="notif" data-toggle="dropdown"></i>
                    <div className="dropdown-menu notification-menu" aria-labelledby="notif" >
                        <div>No notifications</div>
                    </div>
                </div>  
            )
        }else {
            
            return (
                <div className="nav-item ml-2 notification dropdown">
                    <i className="fa fa-bell" id="notif" data-toggle="dropdown">
                        <div></div>
                    </i>
                    <div className="dropdown-menu notification-menu" aria-labelledby="notif" >
                        {
                            props.notification.map((n,i) => {
                                if(!n.isSeen) {
                                    return (
                                        <Link
                                            key={i} 
                                            to={`/forums/${n.forumId}/posts/${n.postId}`} 
                                            className="notification-item dropdown-item"
                                        >
                                            <div className="username">{n.user}</div> replied on your post
                                            <div className="title">{n.post_title}</div>
                                         </Link>
                                    )
                                }
                            })
                        }
                    </div>
                    
                </div>
            )
        }
    }
    const render = () => {
        
        if(props.auth.is_Logged) {
            return (
                <div className="navbar-nav ml-auto">
                    <div className="nav-item ml-2">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    </div>
                    { renderNotification() }    
                    <div className="nav-item ml-2">
                        <button onClick={logout} className="btn btn-danger" type="submit">Logout</button>
                    </div>
                </div>
            )
        }else {
            return (
                <div className="navbar-nav ml-auto">
                    <div className="nav-item ml-2">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    </div>
                    <div className="nav-item ml-2">
                        <Link to="/create" className="btn btn-primary" type="submit">Signup</Link>
                    </div>
                    <div className="nav-item ml-2">
                        <Link to="/login" className="btn btn-success" type="submit">Login</Link>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="navbar navbar-expand-lg">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Home
                </Link>
                <button 
                    className="navbar-toggler" type="button" 
                    data-toggle="collapse" data-target="#my-navbar" 
                    aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="fa fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="my-navbar">
                     <div className="navbar-nav mr-auto">
                        <div className="nav-item">
                            <Link to="/about">
                                About
                            </Link>
                        </div>
                     </div>
                    {
                        render()
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth : state.auth,
        notification : state.notification
    }
}

export default connect(mapStateToProps, { _Logout,_Refresh,seenNotification })(Navbar);



/*
                        {
                            props.notification.map((n,i) => {
                                if(!n.isSeen) {
                                    return (
                                        <Link
                                            key={i} 
                                            to={`/forums/${n.forumId}/posts/${n.postId}`} 
                                            className="notification-item dropdown-item"
                                        >
                                            <div className="username">{n.user}</div> replied on your post
                                            <div className="title">{n.post_title}</div>
                                         </Link>
                                    )
                                }
                            })
                        }
                        */