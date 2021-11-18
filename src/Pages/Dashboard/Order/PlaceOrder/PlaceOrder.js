import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@restart/ui/esm/Button';
import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import useAuth from '../../../../Hooks/useAuth';
import Footer from '../../../Shared/Footer/Footer';
import Header from '../../../Shared/Header/Header';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
const PlaceOrder = () => {
    const { orderID } = useParams();
    const { isLoading, user } = useAuth();
    const history = useHistory();
    // product fetch 
    const [product, setProduct] = useState({});
    const url = `https://artisticglow.herokuapp.com/products/${orderID}`
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [url]);

    // console.log(product);

    






     
    
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [orders, setOrders] = useState({});
    const handleOnblur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newOrder = { ...orders };
        
        newOrder[field] = value;
        setOrders(newOrder);
        // console.log(newOrder)
    }

    // place an order
    const copyObject = {...orders}
    let data = (orders);
    data.customerName = user?.displayName;
    data.customerEmail = user?.email;
    data.orderStatus = "Pending";
    data.product = product;
    // console.log(data)
// console.log(data);
     const handleProduct = e => {
        setSuccess(false)
         if (data.customerName !== "" && data.customerEmail !== "" && copyObject !== "" && data.product !== undefined) {
             fetch('https://artisticglow.herokuapp.com/order', {
                 method: "POST",
                 headers: {
                     'content-type': 'application/json'
                 },
                 body: JSON.stringify(data),
             })
             .then(res => res.json())
                 .then(data => {
                         //  console.log(data)
        if (data.insertedId) {
            setSuccess(true);
            setProduct()
            // setOrders()
            history.push('/paymentmethod')
            }
        else {
            setError(true)
            }
        })
} else {
    alert('Please Complete The Form')
}

         

        e.preventDefault();
       
    }

    return (
        <div>
            <Header/>


           <Container fluid>
                <Row className="mt-5 mb-5 w-75 mx-auto p-lg-3 p-md-3 p-2 shadow">
                    {/* <div > */}
                        <Col lg={4} >
                            <img className=" img-fluid rounded p-2 p-lg-3 p-md-3" src={product?.productImageUrl} alt={product?.productName || "Product Image"}/>

                        <div className=" p-4 p-lg-4 p-md-4 text-lg-start text-md-start">
                            <h2 className="fw-bold fs-3">{product?.productName}</h2>
                            <p  className=" fs-6">{product?.productDescription}</p>
                            <p  className="fw-bold fs-5"><span className="fw-normal">Price:</span> ${product?.productPrice}</p>
                        </div>
                    </Col>
                        <Col lg={8}>
                           
                       

                            <div className="mt-4 w-75 rounded-3 p-5 border-2 mx-auto shadow">
                                     <h2 className="fs-5 fw-bold">Billing Details</h2>
                {
                    !isLoading &&   <Form onSubmit={handleProduct}>
                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="name"
                            type="text"
                            value={user?.displayName}
                            name="customerName"
                            onChange={handleOnblur}
                            placeholder="Enter Name"
                            required
                        />
                        <label htmlFor="name">Name</label>
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="description"
                            type="email"
                            value={user?.email}
                            name="customerEmail"
                            onChange={handleOnblur}
                            placeholder="Email"
                            required
                        />
                        <label htmlFor="description">Email</label>
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                        <Form.Control
                        
                            id="phone"
                            type="number"
                            name="customerNumber"
                            onChange={handleOnblur}
                            placeholder="Enter Your Phone Number"
                            required
                        />
                        <label htmlFor="phone"> Phone Number</label>
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                                        <Form.Control
                                            required
                            id="address"
                            type="text"
                            name="customerAddress"
                            onChange={handleOnblur}
                            placeholder="Enter Billing Address"
                        />
                        <label htmlFor="address"> Shipping Address</label>
                    </Form.Floating>
                    
                    <Form.Floating>
                        <Button type="submit" className="w-100 mt-3 py-3 border-0 btn btn-primary">
                            <FontAwesomeIcon icon={faEnvelope}/> Place Order</Button>
                    </Form.Floating>
                </Form>
              }

  {
                    isLoading && <Spinner animation="grow" variant="dark" ></Spinner>
            }


                {
    error && <div className="mt-3"><Alert severity="error">
  There Are error
</Alert></div>
}
                {
    success && <div className="mt-3"><Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
  Order Place SuccessFully
</Alert></div>
}
            </div>
                       
                       
                    </Col>
                   {/* </div> */}

                </Row>
           </Container>

            <Footer/>
            
        </div>
    );
};

export default PlaceOrder;