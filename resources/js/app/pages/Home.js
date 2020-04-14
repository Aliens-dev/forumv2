import React, { useEffect, useState } from 'react';
import {getAllForumsAction} from '../actions';

import '../assets/styles/HomePageStyle.scss';
import { connect } from 'react-redux';
const Home = props => {
    const { getAllForumsAction, forums } = props;

    const [loading,setLoading] = useState(true);
    useEffect(()=> {
        getAllForumsAction();
    },[])

    const render = () => {
        if(forums.isLoading) {
            return <div> Loading ... </div>
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
                                    {forum.name}
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
                                <span>1</span>
                            </div>
                            <div className="latest">
                                <span>{forum.latest_post.title}</span>
                                <span>{forum.latest_post.created_at} - {forum.latest_post.user.name}</span>
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