import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Redirect, Route } from 'react-router';
import useAuth from '../Hooks/useAuth';
const LoginRedirect = ({ children, ...rest }) => {
     let { user, isLoading } = useAuth();
    if (isLoading) {
        return <Spinner animation="grow" variant="dark" ></Spinner>
    }
    return (
        <Route
            {...rest}
            render={({ location }) => user.email ?  <Redirect  to={{
              pathname: "/",
              state: { from: location }
            }}
            ></Redirect> : 
              children}
        
        
        ></Route>
    );
};

export default LoginRedirect;