import React, { useEffect, useState } from 'react';
import {getAllForumsAction} from '../actions';
import { connect } from 'react-redux';

import '../assets/styles/HomePageStyle.scss';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

const Home = props => {
    const { getAllForumsAction, forums } = props;
    useEffect(()=> {
        getAllForumsAction();
    },[])

    const render = () => {
        if(forums.isLoading) {
            return <Loading />
        }else {
            return forums.data.map(forum => {
                return (
                    <div className="row forum-section" key={forum.id}>
                        <div className="col-8 forum-info">
                            <div className="icon">
                                <img src="/img/forum.gif" alt="forum-icon" />
                            </div>
                            <div className="title">
                                <div className="forum-name">
                                    <Link to={`/forums/${forum.id}`}>{forum.name}</Link>
                                </div>
                                <div className="forum-description">
                                    {forum.description}
                                </div>
                            </div>
                        </div>
                        <div className="col-4 forum-details">
                            <div className="posts">
                                <span>Threads</span>
                                <span>{forum.posts_count}</span>
                            </div>
                            <div className="messages">
                                <span>Messages</span>
                                <span>{forum.replies_count}</span>
                            </div>
                            <div className="latest">
                                { 
                                    forum.latest_post
                                    ? 
                                    <span> { forum.latest_post.created_at }</span>
                                    :
                                    <span>No Posts yet.</span>
                                }
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }
    return (
        <div className="home-page">
            <div className="container">
                { render() }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        forums : state.forums,
    }
}

export default connect(mapStateToProps, { getAllForumsAction })(Home);