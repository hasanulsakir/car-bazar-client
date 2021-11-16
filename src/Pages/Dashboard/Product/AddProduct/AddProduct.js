import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import Button from '@restart/ui/esm/Button';
import { Form, Spinner } from 'react-bootstrap';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import useAuth from '../../../../Hooks/useAuth';
const AddProduct = () => {
    const { isLoading } = useAuth();
    
 const [success, setSuccess] = useState(false);
    const [Product, setProduct] = useState ({});
    const handleOnblur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newProduct = { ...Product };
        
        newProduct[field] = value;
        setProduct(newProduct);
        console.log(newProduct)
}
    const handleProduct = e => {
        setSuccess(false)
fetch('https://artisticglow.herokuapp.com/products', {
            method: "POST",
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify(Product),
        })
            .then(res => res.json())
    .then(data => {
        if (data.insertedId) {
                 setSuccess(true);
            }
        })


        //   console.log(Product)
        setProduct();
        e.preventDefault();
       
    }
    
    return (
        <div>
            <h4><FontAwesomeIcon icon={faPlusCircle} /> Add Product</h4>
            
            <div className="mt-4 w-75 rounded-3 p-5 border-2 mx-auto shadow">
                {
                    !isLoading &&   <Form onSubmit={handleProduct}>
                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="name"
                            type="text"
                            name="productName"
                            onBlur={handleOnblur}
                            placeholder="Enter Product Name"
                        />
                        <label htmlFor="name">Enter Product Name</label>
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="description"
                            type="text"
                            name="productDescription"
                            onBlur={handleOnblur}
                            placeholder="Enter Product Description"
                        />
                        <label htmlFor="description">Enter Product Description</label>
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="price"
                            type="number"
                            name="productPrice"
                            onBlur={handleOnblur}
                            placeholder="Enter Product Price"
                        />
                        <label htmlFor="price">Enter Product Price</label>
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="productImage"
                            type="text"
                            name="productImageUrl"
                            onBlur={handleOnblur}
                            placeholder="Enter Product Image Url"
                        />
                        <label htmlFor="productImage">Enter Product Image Url</label>
                    </Form.Floating>
                    <Form.Floating>
                        <Button type="submit" className="w-100 mt-3 py-3 border-0 btn btn-primary">
                            <FontAwesomeIcon icon={faPlusCircle} /> Add Product</Button>
                    </Form.Floating>
                </Form>
              }

  {
                    isLoading && <Spinner animation="grow" variant="dark" ></Spinner>
            }


                {
    success && <div className="mt-3"><Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
  Product Add SuccessFully
</Alert></div>
}
            </div>

        </div>
    );
};

export default AddProduct;