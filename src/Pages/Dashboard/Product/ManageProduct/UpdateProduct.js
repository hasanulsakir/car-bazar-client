import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';

const UpdateProduct = () => {
 const history = useHistory();
    const { ID } = useParams();
    const [product, setProduct] = useState({});
    const url = `http://localhost:5000/products/${ID}`
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
        .then(data=>setProduct(data))
    }, [url]);
    const handleUpdateService = e => {
        const url = `http://localhost:5000/products/${ID}`
        fetch(url, {
            method: 'PUT',
            headers: {
              'content-type':  'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                if (data.matchedCount > 0) {
                    window.alert('Data Updated!')
                    history.push('/dashboard/manageproduct')
               }
            })
        e.preventDefault();
    }
    const handleTitleChange = e => {
        const updateTitle = e.target.value;
        const updateService = {productName: updateTitle,productDescription:product.productDescription,productPrice:product.productPrice,productImageUrl:product.productImageUrl }
        setProduct(updateService)
    }
    const handleDescriptionChange = e => {
             const updateDescription = e.target.value;
        const updateService = {productName: product.productName,productDescription:updateDescription,productPrice:product.productPrice,productImageUrl:product.productImageUrl}
        setProduct(updateService)
    }
    const handlePriceChange = e => {
          const updatePrice = e.target.value;
        const updateService = {productName: product.productName,productDescription:product.productDescription,productPrice:updatePrice,productImageUrl:product.productImageUrl }
        setProduct(updateService)
    }
    const handleImgUrlChange = e => {
        const updateImgUrl = e.target.value;
        const updateService = {productName: product.productName,productDescription:product.productDescription,productPrice:product.productPrice,productImageUrl:updateImgUrl }
        setProduct(updateService)
    }
    return (
        <div>
             <Container fluid>
                <Row className="mx-auto">
                    <Col lg={12} className="mt-5 mx-auto w-75 shadow p-5 mb-5">
                        <div className="text-center mt-3">
                            <h2 className="text-black fw-bold">
                               Update  Product
                            </h2>

                            <div className="shadow p-5  ">
                                {/* onSubmit={handleSubmit(onSubmit)} */}
                          <form onSubmit={handleUpdateService} className="d-flex flex-column text-center" >
                          <input onChange={handleTitleChange} className="mb-3 py-2"  value={product.productName || ''} />
                          <input onChange={handleDescriptionChange} className="mb-3 py-2" value={product.productDescription || ''}/>
                          <input onChange={handlePriceChange} className="mb-3 py-2" type="number" value={product.productPrice || ''}/>
                          <input onChange={handleImgUrlChange} className="mb-3 py-2" type="text" value={product.productImageUrl || ''}/>
                          <input className="mb-3 py-2 btn btn-success fw-bold display-5" type="submit" value="Update" />
    </form>
                          </div>
                    


                        </div>
                        </Col>
                </Row>
            </Container>
        </div>
    );
};

export default UpdateProduct;