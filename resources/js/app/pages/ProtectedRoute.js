import React,{useState,useEffect} from 'react';
import { withRouter,Route } from 'react-router-dom';
import Loading from "../components/Loading";
import {connect} from "react-redux";
import { _Refresh } from "../actions";

const ProtectedRoute = ({ component,path,...props }) => {
    const getData = JSON.parse(localStorage.getItem('data'));
    const { _Refresh,auth } = props;
    useEffect(()=> {
        if(!getData || !getData.token) {
            props.history.push('/login');
        }
    });
    useEffect(()=> {
        if(getData || getData.token){
            _Refresh(getData.token);
        }
    },[]);
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