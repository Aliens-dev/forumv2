import React from 'react';

const TextWidget = props => {
    return (
        <div style={myStyle}>
            { props.text }
        </div>
    )
}

const myStyle = {
    margin:'0 0 10px 0',
    borderRadius: '3px',
    padding: '7px 5px',
    fontSize: '35px',
    fontWeight: '600',
    textTransform: 'capitalize',
}
export default TextWidget;