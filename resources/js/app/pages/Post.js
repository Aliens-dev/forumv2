import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { getPostAction, getPostRepliesAction,resetPostsStateAction } from '../actions';
import Thread from '../components/Thread';
import TextWidget from '../components/TextWidget';
import Loading from '../components/Loading';

const Post = props => {
    const { getPostAction,getPostRepliesAction,resetPostsStateAction } = props;
    const {postId} = props.match.params;

    useEffect(()=> {
        getPostAction(postId)
        getPostRepliesAction(postId)
        return ()=> {
            resetPostsStateAction()
        }
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
                    <Thread created={myPost.created_at} content={myPost.content}  />
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
                    <Thread key={reply.id} created={reply.created_at} content={reply.content} />
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
export default connect(mapStateToProps, {getPostAction,getPostRepliesAction,resetPostsStateAction })(Post);