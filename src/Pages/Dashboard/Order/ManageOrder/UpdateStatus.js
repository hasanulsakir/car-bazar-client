import Button from '@restart/ui/esm/Button';
import React from 'react';
// import { FloatingLabel, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
const UpdateStatus = () => {
    const history = useHistory();
    const { id } = useParams()
    const [order, setOrders] = React.useState([])
    const url = `http://localhost:5000/order/${id}`
    React.useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
              
            setOrders(data);
        })
    }, [url]);


     // update status 

      const handleStatusChange = e => {
        const updateStatus = e.target.value;
        const updateOrder = {orderStatus: updateStatus }
        setOrders(updateOrder)
    }
 const handleUpdateOrder = e => {
     const url = `http://localhost:5000/order/${id}`;
     console.log(url)
        fetch(url, {
            method: 'PUT',
            headers: {
              'content-type':  'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                if (data.matchedCount > 0) {
                    window.alert('Data Updated!')
                    history.push('/dashboard/managestatus')
               }
            })
        e.preventDefault();
    }
  

    return (
        <div>
             
            
            <div className="mt-4 w-75 rounded-3 p-5 border-2 mx-auto shadow">
                <div className="shadow p-5  ">
                               <h4>Update Status</h4>
                          <form onSubmit={handleUpdateOrder} className="d-flex flex-column text-center" >
                        <input onChange={handleStatusChange} className="mb-3 text-capitalize py-2" value={order?.orderStatus || ''} />
                        <span>Approved, Processing, Pending, Cancel</span>
                                    
                        <Button variant="primary" className="w-100 btn btn-success" type="submit">Update Status  </Button>
                         
                        
                    </form>
                </div>
          </div>
        </div>
    );
};

export default UpdateStatus;