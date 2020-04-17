import React, { useEffect } from 'react';
import Loading from './Loading';


const NavSection = (props) => {
    if(props.content !== undefined) {
        return (
            <div className="nav-section">
                <span> {props.title}</span>
                <span> { props.content }</span>
            </div>
        )
    }else {
        return <Loading />
    }
}

export default NavSection;