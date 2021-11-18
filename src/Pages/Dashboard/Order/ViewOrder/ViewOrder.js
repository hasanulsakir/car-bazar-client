import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@restart/ui/esm/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faShippingFast, faSmile, faTrashAlt, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../../../Hooks/useAuth';
import { NavLink } from 'react-router-dom';

const ViewOrder = () => {
    const { user } = useAuth();
    let id = 1;
const [orders, setOrders] = React.useState([])
    const url = `https://artisticglow.herokuapp.com/orders/${user?.email}`
    React.useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
              const reverseOb = data.reverse()
            setOrders(reverseOb);
            
        })
    }, [url]);




    // delete order 
    const handleDelete = id => {
         const confirm = window.confirm('Are You Confirm, Want To Delete?');
         if (confirm) {
             const uri = `https://artisticglow.herokuapp.com/order/${id}`
    fetch(uri, {
      method:'delete'
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount > 0) {
          const availableOrder = orders.filter(order => order._id !== id)
            setOrders(availableOrder);
        }
    })
         }
  }
    
    return (
        <div>
            <h1>See Order Of</h1>
            <p className="text-primary fw-bold fs-5"> {user?.email}</p>

             <div className="mt-4 5rounded-3 py-3 px-2 border-2 mx-auto shadow">
                
          {
            // eslint-disable-next-line eqeqeq
            orders.length!=0?   <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Serial</TableCell>
            <TableCell align="center">Product Image</TableCell>
            <TableCell align="center">Product Name</TableCell>
            <TableCell align="center">Product Price</TableCell>
            <TableCell align="center">Customer Name</TableCell>
            <TableCell align="center">Customer Email</TableCell>
            <TableCell align="center">Order Status</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {id++}
              </TableCell>
                  <TableCell align="left"><img src={order?.product?.productImageUrl} alt={ order?.product?.productName || "Product Image"} className=" mx-auto w-50"/></TableCell>
              <TableCell align="left">{order?.product?.productName}</TableCell>
              <TableCell align="left">{order?.product?.productDescription.slice(0,70)}...</TableCell>
              <TableCell align="center"> {order?.customerName}</TableCell>
              <TableCell align="center"> {order?.customerEmail}</TableCell>
                  <TableCell align="center"> 
                      {order?.orderStatus === "Pending" &&
                          <Button className=" border-0 rounded px-2 rounded btn-secondary  text-light mx-1" > <FontAwesomeIcon icon={faExclamationTriangle}/> {order?.orderStatus}</Button>
                  }
                      {order?.orderStatus === "Approved" &&
                          <Button className=" border-0 rounded px-2 rounded btn-success  text-light mx-1" > <FontAwesomeIcon icon={faSmile}/> {order?.orderStatus}</Button>
                  }
                      {order?.orderStatus === "Processing" &&
                          <Button className=" border-0 rounded px-2 rounded btn-primary  text-light mx-1" > <FontAwesomeIcon icon={faShippingFast}/> {order?.orderStatus}</Button>
                  }
                      {order?.orderStatus === "Cancel" &&
                          <Button className=" border-0 rounded px-2 rounded btn-danger  text-light mx-1" > <FontAwesomeIcon icon={faWindowClose}/> {order?.orderStatus}</Button>
                  }
                      
                  </TableCell>
                  <TableCell align="center">
                      {order?.orderStatus === "Approved" ?
                           <Button disabled className="btn rounded px-3 py-1 bg-danger fw-bold text-light mx-1" ><FontAwesomeIcon icon={faTrashAlt} /></Button>
                          :
                          <Button onClick={() => handleDelete(order._id)} className="btn rounded px-3 py-1 bg-danger fw-bold text-light mx-1" ><FontAwesomeIcon icon={faTrashAlt} /></Button>
                  }
                      </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    :
              <div className="py-5">
                <h2 className=" mt-4 fs-4 mb-3 text-primary">You Don't Order Any Product Yet</h2>
                <NavLink to='/product'>  <Button className="border-0 btn-primary fs-5 rounded-2 text-white py-3 px-5">Shop</Button></NavLink>
    </div>
               }
              </div>
        </div>
    );
};

export default ViewOrder;