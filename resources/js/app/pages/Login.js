import React ,{ useState,useEffect } from 'react';
import {connect} from "react-redux";
import { _Login,_Refresh,setLoadingAction } from "../actions";
import Loading from "../components/Loading";


const Login = (props) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const { _Login , _Refresh,setLoadingAction} = props;
    useEffect(()=> {
        let data = JSON.parse(localStorage.getItem('data'));
        if(!data || !data.token) {
            setLoadingAction();
        }else{
            _Refresh(data.token);
        }
    },[]);
    const login = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append('email',email);
        data.append('password',password);
        _Login(data);
    };
    const render = () => {
        if(props.auth.loading) {
            return <Loading />;
        }else {
            if(props.auth.is_Logged) {
                return <div>Logged in !</div>
            }else {
                return (
                    <form className="form">
                        <div className="header">
                            <h3>Login Page</h3>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                onChange={(e)=> setEmail(e.target.value)}
                                value={email}
                                className="form-control"
                                name="email"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                className="form-control"
                                name="password"
                                placeholder="Enter your password"
                                onChange={(e)=> setPassword(e.target.value)}
                                value={password}
                            />
                        </div>
                        <div className="submit">
                            <button onClick={login} className="btn btn-success">Login</button>
                        </div>
                    </form>
                )
            }
        }
    }
    return (
        <div className="login-page">
            <div className="container">
                { render() }
            </div>
        </div>
    );
}


const mapStateToProps = (state) => {
    return {
        auth : state.auth
    }
}

export default connect(mapStateToProps,{ _Login, _Refresh,setLoadingAction })(Login);