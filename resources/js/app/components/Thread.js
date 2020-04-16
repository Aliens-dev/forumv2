import React from 'react'
import '../assets/styles/ThreadStyle.scss';



const Thread = (props) => {
    return (
        <div className="wrapper">
            <div className="row thread-calendar">
                <div className="col">
                    <i className="fa fa-clock-o"></i> {props.created}
                </div>
            </div>
            <div className="row thread-main">
                <div className="col-2 profile-section">
                    <div className="profile-pic">
                        <img src="https://unsplash.it/200/200" alt={props.username} />
                    </div>
                    <div className="profile-username">
                        {props.username}
                    </div>
                </div>
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