import { faEdit, faLink, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@restart/ui/esm/Button';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const ManageProduct = () => {
    
    const [Products, setProduct] = useState([]);
   
useEffect(() => {
    fetch('https://artisticglow.herokuapp.com/products/')
        .then(res => res.json())
        .then(data => {
            const reverseOb = data.reverse()
            setProduct(reverseOb);
    })
}, []);


const handleDelete = id => {
         const confirm = window.confirm('Are You Confirm, Want To Delete?');
         if (confirm) {
             const uri = `https://artisticglow.herokuapp.com/products/${id}`
    fetch(uri, {
      method:'delete'
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount > 0) {
          const availableService = Products.filter(product => product._id !== id)
            setProduct(availableService);
        }
    })
         }
  }
    return (
        <div>
            <h2>Manage All Product</h2>
            <div className="mx-2 mt-4 ">
    <Container fluid>
              <Row xs={1} md={4} >

                        {
                            Products.map((product) => 
                          
                           

      
                    <Col
                    key={product._id}
                    className="p-2">
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
           
                                                <NavLink to={`/updateproduct/${product._id}`}>  <Button className="btn rounded px-3 py-1 bg-success fw-bold text-light mx-1" ><FontAwesomeIcon icon={faEdit}/></Button>
                                                </NavLink>
                                                                         
            <Button onClick={()=>handleDelete(product._id)}  className="btn rounded px-3 py-1 bg-danger fw-bold text-light mx-1" ><FontAwesomeIcon icon={faTrashAlt}/></Button>
                                             
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

export default ManageProduct;