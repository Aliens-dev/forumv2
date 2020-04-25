import React , {useEffect} from 'react';
import {Link} from 'react-router-dom';
import NavSection from './NavSection';
import { connect } from 'react-redux';
import { getUserAction,deletePostAction } from '../actions';


const ForumNav = (props) => {
    const user = props.users.find(user => user.id === props.userId);
    const deletePost = () => {
        let res = confirm('are you sure ?')
        if(res) {
            props.deletePostAction(props.postId);
        }
    };
    return (
        <div className="row post-section" >
            <div className="col-8 post-info">
                <div className="icon">
                    <img src="/img/forum.gif" alt="post-icon" />
                </div>
                <div className="title">
                    <div className="post-title">
                        <Link to={props.link} >{props.title}</Link>
                    </div>
                    <div className="post-description">
                        {props.description}
                    </div>
                </div>
            </div>
            <div className="col-4 post-details">
                <NavSection title="Replies" content={props.replies_count} />
                <NavSection title="Created by" content={user && user.name} />
                <NavSection title="Created at" content={props.createdAt} />
            </div>
            <div className="editable">
                {
                    props.editable &&
                    (
                        <div className="dropdown">
                            <span className="editable gg-more-alt" id="edit" data-toggle="dropdown"></span>
                            <div className="dropdown-menu" aria-labelledby="edit">
                                <Link to={`${props.link}/edit`} className="dropdown-item">Edit</Link>
                                <div className="dropdown-item" onClick={deletePost}>Delete</div>
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
        users : state.users,
    }
}
export default connect(mapStateToProps, { getUserAction,deletePostAction })(ForumNav);