import React, { useState, useEffect } from 'react';
import MyEditor from '../components/MyEditor';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { addNewPostAction, fetchForum } from '../actions';
import Loading from "../components/Loading";



const NewPost = (props) => {
    const [title,setTitle] = useState('');
    const [post,setPost] = useState('');
    const {addNewPostAction} = props;
    const forumId = props.match.params.forumId;
    const forum = props.forums.data.find(forum => forum.id == forumId);
    useEffect(()=> {
        if(!forum){
            fetchForum(forumId);
        }
    },[]);
    const addNewPost = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append('title',title);
        data.append('content',post);
        data.append('forum_id',forumId);
        addNewPostAction(data)
        props.history.push('/forums/'+forumId);
    }
    const render =() => {
        return (
            <div className="new-post mt-2">
                <div className="container">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item"> { forum && <Link to={`/forums/${forum.id}`}>{ forum.name }</Link> }</li>
                            <li className="breadcrumb-item active" aria-current="page"></li>
                        </ol>
                    </nav>
                    <form className="add-form">
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input value={title} onChange={e=> setTitle(e.target.value)} type="text" id="title" className="form-control" placeholder="post title"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="post">Post</label>
                            <MyEditor handleChange={e=> setPost(e)} />
                        </div>
                        <div className="form-group">
                            <button onClick={addNewPost} className="btn btn-primary">Add post</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    return render();


}

const mapStateToProps = (state) => {
    return {
        forums:state.forums,
        auth : state.auth,
    }
}
export default connect(mapStateToProps, {addNewPostAction})(NewPost);