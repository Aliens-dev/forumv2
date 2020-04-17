import React from 'react'
import '../assets/styles/ThreadStyle.scss';

const Thread = (props) => {
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
                    {props.content}
                </div>
            </div>
            <div className="row thread-foot">

            </div>
        </div>
    )
}

export default Thread;