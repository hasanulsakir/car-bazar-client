
import Button from '@restart/ui/esm/Button';
import React from 'react';
import {  useHistory, useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';


const Login = () => {
    const { error, signInUsingGoogle, signInUsingGithub } = useAuth();
    const location = useLocation();
    const history = useHistory();
    // const redirect_url = location.state?.from || '/';
    const handleGoogleSignin = () => {
        signInUsingGoogle(location, history)
    }
    const handleGithubSignin = () => {
        signInUsingGithub(location, history)
        //  .then(result => {
        //    history.push(redirect_url)
        //     })
    }
    return (
        <div>
            <div className="p-5 my-5 w-75 mx-auto bg-light shadow">
                <h2 className="mt-3">Login</h2>
                <div className="p-5">
                   <NavLink exact to="/signin"> <Button className="rounded py-2 mb-2 btn btn-success shadow px-5"> Login With Email</Button></NavLink>
                    <br/>
                    <Button disabled className="rounded py-2 mb-2 btn btn-primary shadow px-5"> Login With Phone</Button>
                   <br/>
                    <Button onClick={handleGoogleSignin} className="rounded mb-2 py-2 btn btn-danger shadow px-5"> Login With GOOGLE</Button>
                    <br/>
                    <Button onClick={handleGithubSignin} className="rounded py-2 btn btn-dark shadow px-5"> Login With GITHUB</Button>
                    <p className="text-danger mt-5 fw-bold">{error}</p>
                </div>
              
            </div>
        </div>
    );
};

export default Login;