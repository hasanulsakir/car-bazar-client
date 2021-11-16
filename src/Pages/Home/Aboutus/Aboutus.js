import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import aboutUs from '../../../Image/Bannar/bannar3.jpg';
const Aboutus = () => {
    return (
       <div className="my-5">
            <h2 className="d-2 fw-bold mt-2">About US</h2>
            <div>
                <Container>
  <Row className=" d-lg-flex d-lg-table-row align-items-lg-center">
                        <Col lg={6} md={6} xs={12} className="mt-5  ">
                            <img
                                src={aboutUs}
                                className="rounded mx-auto d-block shadow-lg"
                                alt="About Us" width="100%" />
                          
                        </Col>
                        <Col lg={6} md={6} xs={12} className="mt-5">
                            <p className=" px-2 mx-5 w-70 text-start fs-5 ">
                              Be it an inspiring interview, exciting stories, helpful tips or deeper insights into the BMW world, Changing Lanes, the official podcast of BMW, serves up a wide range of topics that keeps you in the loop  on technology, sustainability, cars, design, and motorsport. In the episodes, our hosts Nicki Shields and Jonathan Tilley ponder on the best race cars, provide historical insights about women in the automotive industry, and interview guests such as BMW i designer Kai Langer. 
                            </p>
                        </Col>
  </Row>
  </Container>
            </div>
        </div>
    );
};

export default Aboutus;