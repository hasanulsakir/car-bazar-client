import { faLink, faShoppingBag, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@restart/ui/esm/Button';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';

const Products = () => {
    const { user } = useAuth();
   
    const [Products, setProduct] = useState([]);
   
useEffect(() => {
    fetch('https://artisticglow.herokuapp.com/products/')
        .then(res => res.json())
        .then(data => {
            const reverseOb = data.reverse()
            setProduct(reverseOb.slice(0,8));
    })
}, []);





    return ( <div>
            <h2> Product</h2>
            <div className="mx-2 mt-4 px-3 ">
    <Container fluid>
              <Row xs={1} md={4} >

                        {
                            Products.map((product) => 
                          
                           

      
                    <Col
                    key={product._id}
                    className="p-md-2 p-lg-2 px-sm-5">
        <div className="rounded-5 border-0 shadow">
     <Card >
  <Card.Img variant="top" height="200px" src={product.productImageUrl} />
  <Card.Body>
    <Card.Title className="fw-bold">{product.productName.slice(0,20)} </Card.Title>
    <Card.Text className=" mx-auto  ">
    {product.productDescription.slice(0,70)} 
    </Card.Text>
    <Card.Text className="fw-bold text-blue display-6">
     $ {product.productPrice} 
                                                </Card.Text>
                                         <NavLink to={`/productdetails/${product._id}`}> <Button className="btn rounded px-3 py-1 navBg fw-bold text-light" variant="primary" ><FontAwesomeIcon icon={faLink} /></Button>
                                        </NavLink>
           
                                               
                                                                         
                                                {
                                                    user?.email &&  <NavLink to={`/placeorder/${product._id}`}> <Button  className="btn rounded px-3 py-1 bg-danger fw-bold text-light mx-1" ><FontAwesomeIcon icon={faShoppingBag}/> Buy Now</Button>  </NavLink>
            }
                                                {
                                                    !user?.email && <NavLink to="/login">
                                                         <Button  className="btn rounded px-3 py-1 bg-danger fw-bold text-light mx-1" ><FontAwesomeIcon icon={faSignInAlt}/> Login</Button>
                                                    </NavLink>
            }
                                             
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

export default Products; 