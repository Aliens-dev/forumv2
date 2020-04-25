import React, { useState, useEffect } from 'react';
import MyEditor from '../components/MyEditor';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import {fetchForum, getPostAction, editPostAction, resetMessage} from '../actions';
import Loading from "../components/Loading";

const EditPost = (props) => {
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const {post,auth,getPostAction,editPostAction,fetchForum,resetMessage} = props;
    const forumId = props.match.params.forumId;
    const postId = props.match.params.postId;
    const forum = props.forums.data.find(forum => forum.id == forumId);
    useEffect(()=> {
        fetchForum(forumId);
        getPostAction(postId)
    },[]);
    useEffect(() => {
        setTitle(post.post.title);
        setContent(post.post.content)
    },[post]);
    const editPost = (e) => {
        e.preventDefault();
        editPostAction(postId,{title,content})
    };
    const render =() => {
        if(post.postLoading) {
            return <Loading />
        }else {
            if(auth.user.id !== post.post.user_id) {
                return <Redirect to={`/forums/${forumId}/`} />
            }else {
                return (
                    <div className="new-post mt-2">
                        <div className="container">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item"> { forum && <Link to={`/forums/${forum.id}`}>{ forum.name }</Link> }</li>
                                    <li className="breadcrumb-item active" aria-current="page">Edit Post</li>
                                </ol>
                            </nav>
                            {
                                props.alert.isSetMessage &&
                                <div
                                    className={`alert ${ props.alert.type === 1 ? 'alert-success' : 'alert-danger'}`}
                                >
                                    { props.alert.message }
                                </div>
                            }
                            <form className="add-form">
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input value={title} onChange={e=> setTitle(e.target.value)} type="text" id="title" className="form-control" placeholder="post title"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="post">Post</label>
                                    <MyEditor handleChange={e=> setContent(e)} value={content} />
                                </div>
                                <div className="form-group">
                                    <button onClick={editPost} className="btn btn-primary">Edit post</button>
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
    }
}
export default connect(mapStateToProps, {getPostAction,editPostAction,fetchForum ,resetMessage})(EditPost);