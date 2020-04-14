import React from 'react';
import '../assets/styles/HomeNavbarStyle.scss';
import { Link } from 'react-router-dom';
const Navbar = () => {

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
                     <div className="navbar-nav ml-auto">
                        <div className="nav-item ml-2">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        </div>
                        <div className="nav-item ml-2">
                            <button className="btn btn-primary" type="submit">Signup</button>
                        </div>
                        <div className="nav-item ml-2">
                            <button className="btn btn-success" type="submit">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Navbar;