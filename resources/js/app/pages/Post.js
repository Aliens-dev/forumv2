import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { getPost, getPostReplies } from '../actions';
import Thread from '../components/Thread';
import TextWidget from '../components/TextWidget';
import Loading from '../components/Loading';

const Post = props => {

    const { getPost,getPostReplies } = props;
    const {postId, forumId} = props.match.params;

    const forumName = 

    useEffect(()=> {
        getPost(forumId,postId)
        getPostReplies(forumId,postId)
    },[])
    const renderPost = () => {
        if(props.post.postLoading){
            return <Loading />
        }else {
            const myPost = props.post.post;
            const userName= props.post.post.user && props.post.post.user.name;
            return (
                <div className="post">
                    <TextWidget text={myPost.title} />
                    <Thread created={myPost.created_at} content={myPost.content} user={myPost.user} />
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
                return (
                    <Thread key={reply.id} created={reply.created_at} content={reply.content} user={reply.user} />
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
                        <li className="breadcrumb-item"><Link to={`/forums/${props.post.post.forum && props.post.post.forum.id}`}>{ props.post.post.forum &&props.post.post.forum.name }</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{props.post.post && props.post.post.title}</li>
                    </ol>
                </nav>
                { renderPost() }
                <div className="replies">
                    { renderReplies() }
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        post : state.post,
    }
}
export default connect(mapStateToProps, {getPost,getPostReplies})(Post);