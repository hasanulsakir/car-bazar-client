
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
            setReview(reverseOb.slice(0,8));
    })
}, []);

  
    return (
        <div>
            <h2 className="mt-2"> Our Client Review</h2>
            <div className="mx-2 mt-5 px-3 ">
    <Container fluid>
              <Row xs={2} md={4} >

                        {
                            review.map((review) => 
                          
                           

      
                    <Col
                    key={review._id}
                    className="p-md-4 p-lg-5 p-sm-2 mb-sm-5">
        <div style={{borderRadius: '0px 0px 2rem 2rem !important',
  boxShadow: '0 0.5rem 0rem #6047ecc7 !important',}} className="rounded-5 border-0 shadow-lg ">
     <Card style={{
  borderRadius: '0px 0px 2rem 2rem !important',
  boxShadow: '0 0.5rem 0rem #6047ecc7 !important',
}}>
  <Card.Img style={{marginTop:'-13%'}} className=" rounded-circle border-0 w-25 mx-auto img-thumbnail" variant="top" width="100px" src={review.userPhoto} />
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
    <Card.Text className=" mx-auto pb-2 ">
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