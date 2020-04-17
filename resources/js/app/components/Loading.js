import React from 'react';


const Loading = () => {
    return (
        <div style={myStyle}>
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

const myStyle = {
    display:'flex',
    justifyContent:'center',
}

export default Loading;