import React, {useEffect} from 'react';
import '../assets/styles/HomeNavbarStyle.scss';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import {_Logout, _Refresh} from "../actions";

const Navbar = (props) => {
    const { _Logout,_Refresh } = props;
    useEffect(()=> {
        let data = JSON.parse(localStorage.getItem('data')) || '';
        if(data === '') {
            _Refresh()
        }else {
            _Refresh(data.token);
        }
    },[]);
    const render = () => {
        if(props.auth.is_Logged) {
            return (
                <div className="navbar-nav ml-auto">
                    <div className="nav-item ml-2">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    </div>
                    <div className="nav-item ml-2">
                        <Link to="/account" className="btn btn-primary" type="submit">my Account</Link>
                    </div>
                    <div className="nav-item ml-2">
                        <button onClick={()=> _Logout(props.auth.token) } className="btn btn-success" type="submit">Logout</button>
                    </div>
                </div>
            )
        }else {
            return (
                <div className="navbar-nav ml-auto">
                    <div className="nav-item ml-2">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    </div>
                    <div className="nav-item ml-2">
                        <Link to="/create" className="btn btn-primary" type="submit">Signup</Link>
                    </div>
                    <div className="nav-item ml-2">
                        <Link to="/login" className="btn btn-success" type="submit">Login</Link>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="navbar navbar-expand-lg">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Home
                </Link>
                <button 
                    className="navbar-toggler"
                    data-toggle="collapse"
                    data-target="#my-navbar"
                    aria-controls="my-navbar"
                    aria-expanded="false"
                    aria-label="Toggle my-navbar"
                >
                    <i className="fa fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="my-navbar">
                     <div className="navbar-nav mr-auto">
                        <div className="nav-item">
                            <Link to="/about">
                                About
                            </Link>
                        </div>
                     </div>
                    {
                        render()
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth : state.auth,
    }
}

export default connect(mapStateToProps, { _Logout,_Refresh })(Navbar);