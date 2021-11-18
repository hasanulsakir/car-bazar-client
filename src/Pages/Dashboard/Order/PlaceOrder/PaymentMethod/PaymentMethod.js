import {  faExclamationTriangle, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@restart/ui/esm/Button';
import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../../../Hooks/useAuth';
import Footer from '../../../../Shared/Footer/Footer';
import Header from '../../../../Shared/Header/Header';
const PaymentMethod = () => {

    const { user } = useAuth();
   
const [orders, setOrders] = React.useState([])
    const url = `https://artisticglow.herokuapp.com/orders/${user?.email}`
    React.useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const reverseOb = data.reverse()
                const sliceData = reverseOb.slice(0, 1)
                // const ser
            setOrders(sliceData[0]);
            
            })
        // console.log('From Payment Method',orders)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);
    return (
        <div>
            <Header></Header>
            {
                orders && <Container className="mt-5 border-0">
                <Row>
                    <Col className="p-4 shadow">
                        <h2 className="text-center fs-2 text-blue">Order Item:</h2>
                     <Card className="mx-auto align-items-start border-0 d-flex flex-lg-row">
                            <div >
                                <Card.Img variant="left" className="img-fluid mt-3" src={orders?.product?.productImageUrl} />
                            </div>
                            <div className=" mx-lg-3 mx-md-3 px-lg-3 px-md-3 text-lg-start text-md-start  text-sm-center">
                                <Card.Body>

                                    <Card.Title>
                                        <Button className=" border-0 rounded px-2 py-1 rounded btn-secondary fs-6  text-light mx-1" > <FontAwesomeIcon icon={faExclamationTriangle}/> {orders?.orderStatus}</Button>
                                    </Card.Title>
                                    <Card.Title className="fs-2 fw-bold">{orders?.product?.productName}</Card.Title>
                                    <Card.Text>
                                        {orders?.product?.productDescription}
                                    </Card.Text>
                                    <Card.Text className="text-blue fs-3">
                                     $<span className="fw-bold">{orders?.product?.productPrice}</span>
                                    </Card.Text>
                                </Card.Body>
                                
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
            }
            <div className="bodyheight d-block mb-5 mt-5">
            <div className="d-flex flex-column align-content-center align-items-center">
                 <p className="text-center  fs-1 mt-5">Payment Method Will be Available Soon </p>
                <NavLink to='/dashboard/vieworder'>  <Button className="border-0 navBg fs-5 rounded-2 text-white py-3 px-5"><FontAwesomeIcon icon={faShoppingBag}/> My Order</Button></NavLink>
           </div>
        </div>

            <Footer/>
        </div>
    );
};

export default PaymentMethod;