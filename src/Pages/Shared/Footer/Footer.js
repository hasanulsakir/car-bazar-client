import { faFacebook, faGoogle, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
const Footer = () => {
    return (
        <div className="navBg py-5">
            <Container fluid>
                
            <Row>
                <Col lg={4} md={4} sm={12} xs={12}>
                    <p className="p-1 w-75 mx-auto text-start">Tap into a better car shopping experience with price drops, save features, and more!</p>
                </Col>
                <Col lg={4} md={4} sm={12} xs={12}>
                   <p className="py-2">© 2021 Design & Developed By <a className="text-black fw-bold text-decoration-none" target="_blank" rel="noreferrer" href="https://www.facebook.com/hasanul.sakir/">Hasanul Karim</a></p>
                </Col>
                <Col lg={4} md={4} sm={12} xs={12}>
                        <div className="d-flex justify-content-center">
                            <div className="mx-2">
                               <NavLink to="https://www.facebook.com/hasanul.sakir/"> <FontAwesomeIcon className="text-light display-6" icon={faFacebook}/></NavLink>
                            </div>
                            <div className="mx-2">
                               <NavLink to="https://www.facebook.com/hasanul.sakir/"> <FontAwesomeIcon className="text-light display-6" icon={faGoogle}/></NavLink>
                            </div>
                            <div className="mx-2">
                               <NavLink to="https://www.facebook.com/hasanul.sakir/"> <FontAwesomeIcon className="text-light display-6" icon={faTwitter}/></NavLink>
                            </div>
                            <div className="mx-2">
                               <NavLink to="https://www.facebook.com/hasanul.sakir/"> <FontAwesomeIcon className="text-light display-6" icon={faYoutube}/></NavLink>
                            </div>
                            
                           
                   </div>
                </Col>
          </Row>
            </Container>
        </div>
    );
};

export default Footer;