import React from "react";
import { connect } from 'react-redux';

const Alert = (props) => {
    return (
            <div
                className={`custom-alert alert ${ props.alert.type === 1 ? 'alert-success' : 'alert-danger'}`}
            >
                { props.alert.message }
            </div>
        )
}

const mapStateToProps =(state) => {
    return {
        alert : state.alert,
    }
}
export default connect(mapStateToProps)(Alert);