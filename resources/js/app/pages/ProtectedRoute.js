import React,{useState,useEffect} from 'react';
import { withRouter,Route } from 'react-router-dom';
import Loading from "../components/Loading";
import {connect} from "react-redux";
import { _Refresh } from "../actions";

const ProtectedRoute = ({ component,path,...props }) => {
    const {auth} = props;
    useEffect(()=> {
        if(!auth.loading && !auth.is_Logged) {
            props.history.push('/login');
        }
    });
    if(auth.loading){
        return <Loading/>
    }else{
        return <Route render={component} path={path} {...props} />
    }
};

const mapStateToProps = (state) => {
    return {
        auth : state.auth,
    }
}

export default withRouter(connect(mapStateToProps, {
    _Refresh
})(ProtectedRoute));