import {  faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useState, useEffect} from 'react';
import Button from '@restart/ui/esm/Button';
import {  Form,Spinner } from 'react-bootstrap';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import useAuth from '../../../Hooks/useAuth';

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
const Ratings = () => {
    
    const { isLoading, user } = useAuth();
// console.log(user.email);
 // last Rating Status
 const [rating, setRating] = useState ({});  
 const [previousRating, setpreviousRating] = useState({})
    const url = `https://artisticglow.herokuapp.com/rating/${user.email}`
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
              
            setpreviousRating(data[0]);
        })
    }, [url]);

      const [value, setValue] = React.useState(previousRating?.star || 0);
 const [success, setSuccess] = useState(false);
    const handleOnblur = e => {
              const ratingComments = e.target.value;
        const updateRatingComment = {ratingComment: ratingComments }
        setRating(updateRatingComment)
  
    }
    let data = (rating)
    data.userPhoto = user?.photoURL || `https://www.pngitem.com/pimgs/m/78-786293_1240-x-1240-0-avatar-profile-icon-png.png`;
    data.userName = user?.displayName;
    data.userEmail = user?.email;
    data.star = value;
    const handleRating = e => {
        setSuccess(false)
fetch('https://artisticglow.herokuapp.com/rating', {
            method: "PUT",
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
    .then(data => {
        if (data.upsertedId) {
          setSuccess(true);
          window.location.reload();
            }
        else if(data.modifiedCount > 0){
          alert('Updated Successfully')
          
            }
        })


          console.log(rating)

        e.preventDefault();
       
    }


   
    return (
        <div>
            <h4><FontAwesomeIcon icon={faStar} className=" text-warning"/> Feedback Us</h4>
            
            <div className="mt-4 w-75 rounded-3 p-5 border-2 mx-auto shadow">
                
                {
                    previousRating?.userEmail && <div>
                      <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >  <span>Previous Rating: 
    </span>
      <Rating
        name="simple-controlled"
        value={previousRating?.star || value}
        readOnly  
      /> 
                    
      
    </Box> 
                    </div>
                    
                }
                
                <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
    
      <Rating
        name="simple-controlled"
        value={value}
       
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      /> 
                  
      
    </Box>
               
               
               
                {
                    !isLoading && 
                                     <Form onSubmit={handleRating}>

                           {
                            previousRating?.userEmail && <div>
                                <h4 className="fs-6 text-start text-capitalize w-75 mx-auto">Feedback: <span className="fw-normal">{previousRating?.ratingComment}</span></h4>
                            </div>
                    
                }
                       
                        <Form.Floating className="mb-3">
                        <Form.Control
                            id="rating"
                             type="text"
                            name="ratingComment"
                            onChange={handleOnblur}
                                placeholder="Your Comment Here"
                                value={rating.ratingComment || ''}
                        />
                        <label htmlFor="rating">Give Us Your Feedback </label>
                        </Form.Floating>
                        
                           <Form.Floating>
                         <Button type="submit" className="w-100 mt-3 py-3 border-0 btn btn-primary">
                                <FontAwesomeIcon icon={faStar} /> Feedback</Button>
                        </Form.Floating>
   </Form>
                    
                    
                    
                   
              }

  {
                    isLoading && <Spinner animation="grow" variant="dark" ></Spinner>
            }


                {
    success && <div className="mt-3"><Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
  Feedback Add SuccessFully
</Alert></div>
}
            </div>

        </div>
    );
};

export default Ratings;