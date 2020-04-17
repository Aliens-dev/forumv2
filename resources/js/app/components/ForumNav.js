import React , {useEffect} from 'react';
import {Link} from 'react-router-dom';
import NavSection from './NavSection';
import { connect } from 'react-redux';
import { getUserAction } from '../actions';


const ForumNav = (props) => {
    const user = props.users.find(user => user.id === props.userId);
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
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        users : state.users,
    }
}
export default connect(mapStateToProps, { getUserAction })(ForumNav);