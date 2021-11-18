import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@restart/ui/esm/Button';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../../Hooks/useAuth';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
const Signin = () => {

  const { error, LoginUser} = useAuth();
  const location = useLocation();
  const history = useHistory();
    const redirect_url = location.state?.from || '/';
    const [success, setSuccess] = useState(false)
 
 const [signInData, setsignInData] = useState({});
    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...signInData };
        newLoginData[field] = value;
        setsignInData(newLoginData);
}
    const handleLogin = e => {
        LoginUser(signInData.email,signInData.password)
              .then((result) => {
              
                // eslint-disable-next-line eqeqeq
                if (result == !error) {
                  alert('Login Success')
                  setSuccess(true);
                  history.push(redirect_url)
                   }
              })
      
              
}

    return (
        <div>
            <div className="p-5 my-5 w-75 mx-auto bg-light shadow">
                <h2 className="mt-3">Login</h2>

                <div className="w-50 my-5 mx-auto">
                   <Form onSubmit={handleLogin}>
                        
  <Form.Floating className="mb-3">
    <Form.Control
      id="floatingInputCustom"
      type="email"
      name="email"
      onBlur={handleOnChange}
      placeholder="name@example.com"
    />
    <label htmlFor="floatingInputCustom">Email address</label>
  </Form.Floating>
  <Form.Floating className="mb-3">
    <Form.Control
      id="floatingPasswordCustom"
      type="password"
      name="password"
      onBlur={handleOnChange}
      placeholder="Password"
    />
    <label htmlFor="floatingPasswordCustom">Password</label>
  </Form.Floating>
 
  <Form.Floating>
                            <Button type="submit" className="w-100 mt-3 py-3 border-0 btn btn-danger">Login</Button>
  </Form.Floating>

            </Form>
           {
    success && <div className="mt-3"><Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
  Product Add SuccessFully
</Alert></div>
}
            
             <p>{error}</p>
                </div>




                <span className="mt-4">New User ? <NavLink exact to="/signup">Register</NavLink>
                </span>
                <br/>
                <NavLink exact to="/login"> <Button className="rounded py-2 my-3 btn btn-light shadow px-5"> <FontAwesomeIcon icon={faBackward}/> Go Back Quick Login</Button></NavLink>
         
            </div>
        </div>
    );
};

export default Signin;