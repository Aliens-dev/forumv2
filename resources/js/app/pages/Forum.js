import React, { useEffect } from 'react';
import { getPosts } from '../actions';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import '../assets/styles/PostsListPage.scss';

const Forum = props => {
    const { getPosts,posts } = props;
    useEffect(()=> {

        getPosts(props.match.params.forumId);
    },[])
    const render = () => {
        console.log(props)
        if(posts.isLoading) {
            return <div> Loading ... </div>
        }else {
            return posts.data.map(post => {
                return (
                    <div className="row post-section" key={post.id}>
                        <div className="col-8 post-info">
                            <div className="icon">
                                <img src="/img/forum.gif" alt="post-icon" />
                            </div>
                            <div className="title">
                                <div className="post-title">
                                    <Link to={`${post.forum_id}/posts/${post.id}`}>{post.title}</Link>
                                </div>
                                <div className="post-description">
                                    {post.description}
                                </div>
                            </div>
                        </div>
                        <div className="col-4 post-details">
                            <div className="posts">
                                <span>Replies</span>
                                <span>{post.replies_count}</span>
                            </div>
                            <div>
                                <span>{ post.user.name }</span>
                            </div>
                            <div>
                                <span> Created at</span>
                                <span> { post.created_at }</span>
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
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{posts.forum.name}</li>
                    </ol>
                </nav>
                { render() }
            </div>
        </div>
    )
}

const mapStateToPorps = (state) => {
    return {
        posts : state.posts,
    }
}
export default connect(mapStateToPorps,{ getPosts })(Forum);