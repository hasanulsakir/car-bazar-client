
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
const Review = () => {

      const [review, setReview] = useState([]);
   
useEffect(() => {
    fetch('https://artisticglow.herokuapp.com/rating')
        .then(res => res.json())
        .then(data => {
            const reverseOb = data.reverse()
            setReview(reverseOb);
    })
}, []);


    return (
        <div>
            <h2 className="mt-2"> Our Client Review</h2>
            <div className="mx-2 mt-5 px-3 ">
    <Container fluid>
              <Row xs={1} md={4} >

                        {
                            review.map((review) => 
                          
                           

      
                    <Col
                    key={review._id}
                    className="p-2">
        <div className="rounded-5 border-0 shadow-lg ">
     <Card >
  <Card.Img className=" rounded-circle border-0 w-25 mx-auto img-thumbnail" variant="top" width="100px" src={review.userPhoto} />
  <Card.Body>
    <Card.Title>{review.userName} </Card.Title>
    <Card.Title>

         <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
     
      <Rating
        name="simple-controlled"
        value={review.star}
        readOnly 
      />

   </Box>
                                                    
    </Card.Title>
    <Card.Text className=" mx-auto  ">
    {review.ratingComment} 
    </Card.Text>
  
                                        
                                             
  </Card.Body>
</Card>
            </div>
            </Col>
                           
               )}     

</Row>
</Container>

            </div>
        </div>
    );
};

export default Review;