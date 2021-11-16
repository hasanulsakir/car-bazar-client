
import Button from '@restart/ui/esm/Button';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const ProductDetails = () => {
    const { ID } = useParams();
    const [product, setProduct] = useState({});
    const url = `https://artisticglow.herokuapp.com/products/${ID}`
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
        .then(data=>setProduct(data))
    }, [url]);
    return (
        <div>
            <Header></Header>
            <Container fluid>
                <Row className="mt-5 mb-5 w-75 mx-auto p-lg-3 p-md-3 p-2 shadow">
                    {/* <div > */}
                        <Col lg={6} >
                            <img className=" img-fluid rounded p-2 p-lg-3 p-md-3" src={product?.productImageUrl} alt={product?.productName || "Product Image"}/>
                    </Col>
                        <Col lg={6}>
                            <div className=" p-4 p-lg-4 p-md-4 text-lg-start text-md-start">
                            <h2 className="fw-bold fs-3">{product.productName}</h2>
                            <p  className=" fs-6">{product.productDescription}</p>
                            <p  className="fw-bold fs-5"><span className="fw-normal">Price:</span> ${product.productPrice}</p>
                        </div>
                        <div>
                             <NavLink to={`/placeorder/${product._id}`}> <Button  className="btn rounded px-3 py-1 bg-danger fw-bold text-light mx-1" ><FontAwesomeIcon icon={faShoppingBag}/> Buy Now</Button>  </NavLink>
                        </div>
                    </Col>
                   {/* </div> */}

                </Row>
           </Container>

            <Footer></Footer>

        </div>
    );
};

export default ProductDetails;