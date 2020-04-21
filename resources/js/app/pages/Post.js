import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {resetPostsStateAction,_getRepliesAndUsers,fetchForum,AddNewReplyAction,_getPostAndUser } from '../actions';
import Thread from '../components/Thread';
import TextWidget from '../components/TextWidget';
import Loading from '../components/Loading';
import MyEditor from '../components/MyEditor';

const Post = props => {
    const { resetPostsStateAction,_getRepliesAndUsers,fetchForum,AddNewReplyAction,_getPostAndUser} = props;
    const {postId,forumId} = props.match.params;
    const myPost = props.post;
    const forum = props.forums.data.find(forum => forum.id === myPost.post.forum_id);
    const [newReply,setNewReply] = useState({
        content: '',
    });
    useEffect(()=> {
        _getPostAndUser(postId);
        _getRepliesAndUsers(postId);
        fetchForum(forumId);
        return ()=> {
            resetPostsStateAction()
        }
    },[])

    const handleChange = (e) => {
        setNewReply({
            content:e
        });
    }
    const addReply =() => {
        if(newReply !== ''){
            AddNewReplyAction(postId,newReply);
        }
    }
    const renderPost = () => {
        if(myPost.postLoading){
            return <Loading />
        }else {
            const user = props.users.find(user=> user.id = myPost.post.user_id);
            return (
                <div className="post">
                    <TextWidget text={myPost.post.title} />
                    <Thread created={myPost.post.created_at} content={myPost.post.content} user={user}  />
                </div>
            )
        }
    }
    const renderReplies = () => {
        if(props.post.repliesLoading){
            return <Loading />
        }else {
            const myReplies = props.post.replies;
            return myReplies.map(reply => {
                const user = props.users.find(user=> user.id == reply.user_id);
                return (
                    <Thread key={reply.id} created={reply.created_at} content={reply.content} user={user} />
                )
            });
        }
    }
    return (
        <div className="home-page">
            <div className="container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"> { forum && <Link to={`/forums/${forum.id}`}>{ forum.name }</Link> }</li>
                        <li className="breadcrumb-item active">{myPost && myPost.post.title}</li>
                    </ol>
                </nav>
                { renderPost() }
                <div className="replies">
                    { renderReplies() }
                </div>
                {

                }
                <div className="add-reply">
                    <MyEditor handleChange={handleChange} />
                </div>
                <div className="add-btn">
                    <button onClick={addReply} className="btn btn-primary">Add Reply</button>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        post : state.post,
        users : state.users,
        forums : state.forums,
    }
}
export default connect(mapStateToProps, 
    {   
        resetPostsStateAction,
        _getRepliesAndUsers,
        fetchForum,
        AddNewReplyAction,
        _getPostAndUser
    })(Post);