
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
                <h2 className="mt-3 fs-1 fw-bold text-blue">Login</h2>
                <div className="p-5 w-50 mx-auto">
                   <NavLink exact to="/signin"> <Button className="rounded text-start w-75 py-2 mb-2 btn navBg shadow px-5"><FontAwesomeIcon icon={faEnvelope}/> Login With Email</Button></NavLink>
                    <br/>
                    
                    <Button onClick={handleGoogleSignin} className="rounded text-start w-75 mb-2 py-2 btn btn-danger shadow px-5"> <FontAwesomeIcon icon={faGoogle}/>  Login With GOOGLE</Button>
                    <br/>
                    <Button onClick={handleGithubSignin} className="rounded text-start w-75 py-2 btn btn-dark shadow px-5 mb-2"><FontAwesomeIcon icon={faGithub} /> Login With GITHUB</Button>
                    <br/>
                    
                    <p className="text-danger mt-5 fw-bold">{error}</p>
                </div>
              <NavLink exact to="/"> <Button className="rounded w-100 py-2 btn btn-secondary shadow px-5"><FontAwesomeIcon icon={faHome}/> Back Home</Button></NavLink>
            </div>
        </div>
    );
};

export default Login;