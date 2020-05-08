import React, { useEffect } from 'react'
import '../assets/styles/ThreadStyle.scss';
import parse from 'html-react-parser';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { setPostLike } from '../actions';


const Thread = (props) => {
    const {setPostLike} = props;
    const setAction = () => {
        props.setAction(props.id);
    }
    const renderLikes = () => {
        let liked = props.likes && props.likes.find(like => like === props.auth.user.id);
        if(props.likes && props.likes.length) {
            return (
                <div>
                    <i 
                        className={`fa fa-thumbs-up emoji ${liked && 'emoji-color'}`} 
                        onClick={setAction}
                    ></i>
                    <span>{ props.likes.length }</span>
                </div>
            )
        }else {
            return (
                <div>
                    <i className="fa fa-thumbs-up emoji" onClick={setAction}></i>
                </div>
            )
        }
    }

    return (
        <div className="wrapper">
            <div className="row thread-calendar">
                <div className="col">
                    <i className="fa fa-clock-o"></i>
                    <span>{props.created}</span>
                </div>
            </div>
            <div className="row thread-main">
                {
                    props.user && 
                    <div className="col-2 profile-section">
                        <div className="profile-pic">
                            <img src="https://unsplash.it/200/200" alt='' />
                        </div>
                        <div className="profile-username">
                            {props.user.name}
                        </div>
                        <div className="profile-date">
                            Joined: { props.user.created_at }
                        </div>
                    </div>
                }
                <div className="col-10">
                    {
                        parse(props.content)
                    }
                </div>
            </div>
            <div className="row thread-foot">
               { renderLikes() }
            </div>
            <div className="editable">
                {
                    props.editable &&
                    (
                        <div className="dropdown">
                            <span className="editable gg-more-alt" id="edit" data-toggle="dropdown"></span>
                            <div className="dropdown-menu" aria-labelledby="edit">
                                <Link to={`${props.link}`} className="dropdown-item">Edit</Link>
                                <div className="dropdown-item" onClick={()=>props.myAction(props.id)}>Delete</div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps , {
    setPostLike,
})(Thread);