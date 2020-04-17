import React, { useEffect } from 'react';
import { getPostsAndUsersAction,resetForumPostsStateAction } from '../actions';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import ForumNav from '../components/ForumNav';
import '../assets/styles/PostsListPage.scss';
import Loading from '../components/Loading';

const Forum = props => {
    const { getPostsAndUsersAction,resetForumPostsStateAction,posts } = props;
    useEffect(()=> {
        getPostsAndUsersAction(props.match.params.forumId);
        return function cleanup() {
            resetForumPostsStateAction();
        }
    },[]);

    const render = () => {
        if(posts.isLoading) {
            return <Loading />
        }else {
            return posts.data.map(post => {
                return (
                    <ForumNav 
                        key={post.id}
                        link={`${post.forum_id}/posts/${post.id}`}  
                        title={post.title}
                        description ={post.description}
                        replies_count={post.replies_count}
                        userId = {post.user_id}
                        createdAt = {post.created_at}
                    />
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
                        <li className="breadcrumb-item active" aria-current="page"></li>
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
export default connect(mapStateToPorps,{ getPostsAndUsersAction,resetForumPostsStateAction })(Forum);