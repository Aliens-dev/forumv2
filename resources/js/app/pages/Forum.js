import React, { useEffect } from 'react';
import { getPostsAndUsersAction,resetForumPostsStateAction,fetchForum } from '../actions';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import ForumNav from '../components/ForumNav';
import '../assets/styles/PostsListPage.scss';
import Loading from '../components/Loading';

const Forum = props => {
    const { getPostsAndUsersAction,resetForumPostsStateAction,posts,auth,fetchForum } = props;
    const forumId = props.match.params.forumId;
    const forum = props.forums.data.find(forum => forum.id == forumId);
    useEffect(()=> {
        fetchForum(forumId);
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
                let editable = post.user_id === auth.user.id;
                return (
                    <ForumNav 
                        key={post.id}
                        link={`/forums/${post.forum_id}/posts/${post.id}`}
                        postId={post.id}
                        title={post.title}
                        description ={post.description}
                        replies_count={post.replies_count}
                        userId = {post.user_id}
                        createdAt = {post.created_at}
                        editable={editable}
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
                        <li className="breadcrumb-item active" aria-current="page"> { forum ? forum.name : ''  }</li>
                    </ol>
                </nav>
                <div className="add-post mb-3">
                    {
                        props.auth.is_Logged && <Link to={`${props.location.pathname}/new`} className="btn btn-primary">Add post</Link>
                    }
                </div>
                { render() }    
            </div>
        </div>
    )
}

const mapStateToPorps = (state) => {
    return {
        posts : state.posts,
        auth: state.auth,
        forums : state.forums,
    }
}
export default connect(mapStateToPorps,{ getPostsAndUsersAction,resetForumPostsStateAction,fetchForum })(Forum);