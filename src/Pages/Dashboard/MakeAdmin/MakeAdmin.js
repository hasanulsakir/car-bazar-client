import Button from '@restart/ui/esm/Button';
import React, { useState } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import useAuth from '../../../Hooks/useAuth';
const MakeAdmin = () => {
    const { isLoading } = useAuth();
   const [success, setSuccess] = useState(false);
   const [fail, setFailure] = useState(false);
   const [admin, setAdmin] = useState({});
    const handleOnblur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newAdmin = { ...admin };
        
        newAdmin[field] = value;
        setAdmin(newAdmin);
        console.log(newAdmin)
}
    const handleAdmin = e => {
        const email = admin;
        fetch('https://artisticglow.herokuapp.com/users/admin', {
            method: "PUT",
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify(email),
        })
            .then(res => res.json())
            .then(data => {

                if (data.modifiedCount) {
                    setSuccess(true);
                    setFailure(false);
                    console.log(data)
                } else if (data.matchedCount) {
                     setSuccess(false);
                    setFailure(true)
                } else {
                    setSuccess(false);
                    setFailure(false);
                    alert('User Not Found!')
                }
            
        })
          

        e.preventDefault();
       
}

    return (
        <div>
            <h1>Make An Admin</h1>
            <div className="w-50 mx-auto mt-3 ">

                {!isLoading && <Form onSubmit={handleAdmin}>
                    <Form.Floating className="mb-3">
    <Form.Control
      id="floatingPassword2"
      type="email"
      name="email"
      onBlur={handleOnblur}
      placeholder="Enter Email"
    />
    <label htmlFor="floatingPassword2">Enter Email</label>
  </Form.Floating>
  <Form.Floating>
                            <Button type="submit" className="w-100 mt-3 py-3 border-0 btn btn-primary">Make An Admin</Button>
  </Form.Floating>
                </Form>
             
                }
                {
                    isLoading && <Spinner animation="grow" variant="dark" ></Spinner>
            }
{
    success && <div className="mt-3"><Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
  Admin Add SuccessFully
</Alert></div>
}
{
    fail && <div className="mt-3"><Alert severity="error">
        This User Already An Admin
       
      </Alert></div>
}
            </div>
        </div>
    );
};

export default MakeAdmin;