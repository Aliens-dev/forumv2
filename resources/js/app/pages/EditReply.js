import React, { useState, useEffect } from 'react';
import MyEditor from '../components/MyEditor';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import {getReplyAction,editReplyAction,fetchForum,getPostAction} from '../actions';
import Loading from "../components/Loading";

const EditReply = (props) => {
    const [content,setContent] = useState('');
    const {post,reply,auth,getReplyAction,editReplyAction,fetchForum,getPostAction} = props;
    const forumId = props.match.params.forumId;
    const postId = props.match.params.postId;
    const replyId = props.match.params.replyId;
    const forum = props.forums.data.find(forum => forum.id == forumId);
    useEffect(()=> {
        fetchForum(forumId);
        getPostAction(postId)
        getReplyAction(replyId);
    },[]);
    useEffect(() => {
        setContent(reply.reply.content)
    },[reply]);
    const editReply = (e) => {
        e.preventDefault();
        editReplyAction(replyId,{content})
    };
    const render =() => {
        console.log(reply);
        if(reply.replyLoading) {
            return <Loading />
        }else {
            if(auth.user.id !== reply.reply.user_id) {
                return <Redirect to={`/forums/${forumId}/`} />
            }else {
                return (
                    <div className="new-post mt-2">
                        <div className="container">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item"> { forum && <Link to={`/forums/${forum.id}`}>{ forum.name }</Link> }</li>
                                    <li className="breadcrumb-item active" aria-current="page">Edit Reply</li>
                                </ol>
                            </nav>
                            <form className="add-form">
                                <div className="form-group">
                                    <label htmlFor="post">Post</label>
                                    <MyEditor handleChange={e=> setContent(e)} value={content} />
                                </div>
                                <div className="form-group">
                                    <button onClick={editReply} className="btn btn-primary">Edit Reply</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        }
    };
    return render();


}

const mapStateToProps = (state) => {
    return {
        forums:state.forums,
        auth : state.auth,
        post : state.post,
        alert: state.alert,
        reply: state.reply,
    }
}
export default connect(mapStateToProps, {getReplyAction,editReplyAction,fetchForum,getPostAction})(EditReply);