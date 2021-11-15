import Button from '@restart/ui/esm/Button';
import React, { useState } from 'react';
import { Form,  Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../../Hooks/useAuth';

const Signup = () => {

  const {error, RegisterUser,isLoading } = useAuth();
   
    const history = useHistory();
   

    const [signUpData, setSignUnData,user] = useState({});
    const handleOnblur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...signUpData };
        newLoginData[field] = value;
        setSignUnData(newLoginData);
}
    const handleSignUp = e => {
        
        if (signUpData.password !== signUpData.password2) {
            alert('Password Not Match!');
        } else {
            
         RegisterUser(signUpData.email,signUpData.password,signUpData.name,history)
       
}

        e.preventDefault();
}

    return (
        <div>
            <div className="p-5 my-5 w-75 mx-auto bg-light shadow">
                <h2 className="mt-3">Register</h2>

                  <div className="w-50 my-5 mx-auto">
            {!isLoading &&
              <Form onSubmit={handleSignUp}>
                        
  <Form.Floating className="mb-3">
    <Form.Control
      id="name"
      type="text"
      name="name"
      onBlur={handleOnblur}
      placeholder="name@example.com"
    />
    <label htmlFor="name">Your Full Name</label>
  </Form.Floating>
  <Form.Floating className="mb-3">
    <Form.Control
      id="floatingInputCustom"
      type="email"
      name="email"
      onBlur={handleOnblur}
      placeholder="name@example.com"
    />
    <label htmlFor="floatingInputCustom">Email address</label>
  </Form.Floating>
  <Form.Floating className="mb-3">
    <Form.Control
      id="floatingPasswordCustom"
      type="password"
      name="password"
      onBlur={handleOnblur}
      placeholder="Password"
    />
    <label htmlFor="floatingPasswordCustom">Password</label>
  </Form.Floating>
  <Form.Floating className="mb-3">
    <Form.Control
      id="floatingPassword2"
      type="password"
      onBlur={handleOnblur}
      name="password2"
      placeholder="Re-Type Password"
    />
    <label htmlFor="floatingPassword2">Re-Type Password</label>
  </Form.Floating>
  <Form.Floating>
                            <Button type="submit" className="w-100 mt-3 py-3 border-0 btn btn-danger">Register</Button>
  </Form.Floating>

            </Form>}
            {
              isLoading && <Spinner animation="grow" variant="dark" ></Spinner>
            }
            <p>{error}</p>
             {user?.email && <p>Login Success</p>}
                </div>








                <span>Already Have an Account ? <NavLink exact to="/signin">Login</NavLink>
                </span>
         
            </div>
        </div>
    );
};
export default Signup;