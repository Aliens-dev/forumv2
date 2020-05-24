import React ,{ useState,useEffect } from 'react';
import {connect} from "react-redux";
import { _Login,_Refresh,setLoadingAction } from "../actions";
import Loading from "../components/Loading";
import "../assets/styles/authStyle.scss";

const CreateUser = (props) => {
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [passwordConfirmation,setPasswordConfirmation] = useState('');
    const [successMessage,setSuccessMessage] = useState(false);
    const [errors,setErrors] = useState({});
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
    const reset = (e) => {
        e.preventDefault();
        setPassword('');
        setEmail('');
        setName('');
        setPasswordConfirmation('');
    }
    const create = (e) => {
        setSuccessMessage(false);
        e.preventDefault();
        let data = new FormData();
        data.append('name',name);
        data.append('email',email);
        data.append('password',password);
        data.append('password_confirmation',passwordConfirmation);
        axios.post('/api/register',data)
            .then(res=> {
                if(res.data.success) {
                    setSuccessMessage(true)
                }else {
                    console.log(res.data.errors);
                    setErrors(res.data.errors)
                }
            })
            .catch(err=> {
                alert(err.message())
            })
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
                                <span>Create account</span>
                            </div>
                            <div className="form-group">
                                <input
                                    id="name"
                                    onChange={(e)=> setName(e.target.value)}
                                    value={name}
                                    className="form-control"
                                    name="name"
                                    placeholder="Enter your name"
                                />
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
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    onChange={(e)=> setPassword(e.target.value)}
                                    value={password}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    className="form-control"
                                    name="password-confirmation"
                                    placeholder="Confirm password"
                                    onChange={(e)=> setPasswordConfirmation(e.target.value)}
                                    value={passwordConfirmation}
                                />
                            </div>

                            <div className="submit">
                                <button onClick={create} className="btn btn-success">Create</button>
                                <button onClick={reset} className="btn btn-info ml-2" >reset</button>
                            </div>
                        </form>
                        <div className="message mt-5">
                            {
                                successMessage && <div className="alert alert-success">Successfully Created, Please Log in</div>
                            }
                            {
                                errors && Object.keys(errors).map(error => {
                                    return (
                                        <div key={error} className="mt-2 alert alert-danger"> {errors[error]} </div>
                                    )
                                })
                            }
                        </div>
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

export default connect(mapStateToProps,{ _Login, _Refresh,setLoadingAction })(CreateUser);