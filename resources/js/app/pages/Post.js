import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {resetPostsStateAction,_getRepliesAndUsers,fetchForum,AddNewReplyAction,_getPostAndUser } from '../actions';
import { deletePostAction,deleteReplyAction } from '../actions';
import Thread from '../components/Thread';
import TextWidget from '../components/TextWidget';
import Loading from '../components/Loading';
import MyEditor from '../components/MyEditor';

const Post = props => {
    const { resetPostsStateAction,_getRepliesAndUsers,
        fetchForum,AddNewReplyAction,_getPostAndUser,
        deletePostAction,deleteReplyAction
    } = props;
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
    const deletePost = (id) => {
        deletePostAction(id);
    }
    const deleteReply = (id) => {
        deleteReplyAction(id);
    }
    const renderPost = () => {
        if(myPost.postLoading){
            return <Loading />
        }else {
            const user = props.users.find(user=> user.id = myPost.post.user_id);
            let editable = false;
            if(myPost.post.user_id === props.auth.user.id) {
                editable = true;
            }
            return (
                <div className="post">
                    <TextWidget text={myPost.post.title} />
                    <Thread
                        created={myPost.post.created_at}
                        content={myPost.post.content}
                        user={user}
                        link={`/forums/${myPost.forum_id}/posts/${myPost.id}/edit`}
                        myAction={deletePost}
                        id = {myPost.post.id}
                        editable={editable}
                    />
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
                let editable= false;
                if(reply.user_id === props.auth.user.id) {
                    editable = true;
                }
                return (
                    <Thread 
                        key={reply.id} 
                        link={`/forums/${forum && forum.id}/posts/${reply.post_id}/reply/${reply.id}`}
                        editable={editable} 
                        created={reply.created_at}
                        content={reply.content} 
                        user={user}
                        id = {reply.id}
                        myAction={deleteReply}
                    />
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
                    props.auth.is_Logged && 
                    <div className="add-reply">
                        <MyEditor handleChange={handleChange} />
                    </div>
                }
                {
                    props.auth.is_Logged && 
                    <div className="add-btn">
                        <button onClick={addReply} className="btn btn-primary">Add Reply</button>
                    </div>
                }
                
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        post : state.post,
        users : state.users,
        forums : state.forums,
        auth:state.auth,
    }
}
export default connect(mapStateToProps, 
    {   
        resetPostsStateAction,
        _getRepliesAndUsers,
        fetchForum,
        AddNewReplyAction,
        _getPostAndUser,
        deletePostAction,
        deleteReplyAction
    })(Post);