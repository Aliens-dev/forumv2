import React ,{ useState,useEffect } from 'react';
import {connect} from "react-redux";
import { _Login,_Refresh,setLoadingAction } from "../actions";
import Loading from "../components/Loading";
import "../assets/styles/authStyle.scss";

const Login = (props) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const { _Login , _Refresh,setLoadingAction} = props;
    useEffect(()=> {
        console.log(props.history)
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
                {
                    props.history.action === 'POP' ? props.history.push('/') : props.history.goBack() 
                }
            }else {
                return (
                    <div className="form-container">
                        <form className="form">
                            <div className="header">
                                <span>Login Page</span>
                            </div>
                            <div className="form-group">
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
                                <input
                                    id="password"
                                    className="form-control"
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    onChange={(e)=> setPassword(e.target.value)}
                                    value={password}
                                />
                            </div>
                            <div className="submit">
                                <button onClick={login} className="btn btn-success">Login</button>
                            </div>
                        </form>
                    </div>
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