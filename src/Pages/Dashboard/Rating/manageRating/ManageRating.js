import * as React from 'react';
import {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Button from '@restart/ui/esm/Button';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const ManageRating = () => {
// get rating 
    let id = 1;
const [previousRating, setpreviousRating] = useState([])
    const url = `https://artisticglow.herokuapp.com/rating/`
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
              
            setpreviousRating(data);
        })
    }, [url]);



// delete rating 
    const handleDelete = id => {
         const confirm = window.confirm('Are You Confirm, Want To Delete?');
         if (confirm) {
             const uri = `https://artisticglow.herokuapp.com/rating/${id}`
    fetch(uri, {
      method:'delete'
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount > 0) {
          const availableRating = previousRating.filter(rating => rating._id !== id)
            setpreviousRating(availableRating);
        }
    })
         }
  }



    return (
        <div>
            <h2>All FeedBack</h2>

            <div className="mt-4 w-75 rounded-3 p-5 border-2 mx-auto shadow">
                
                <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Serial</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">FeedBack</TableCell>
            <TableCell align="center">Star</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {previousRating.map((rating) => (
            <TableRow
              key={rating._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {id++}
              </TableCell>
              <TableCell align="left">{rating.userName}</TableCell>
              <TableCell align="left">{rating.ratingComment.slice(0,70)}...</TableCell>
              <TableCell align="center"> <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >  
      <Rating
        name="simple-controlled"
        value={rating.star}
        readOnly  
      /> 
                    
      
    </Box> </TableCell>
              <TableCell align="center"><Button  onClick={()=>handleDelete(rating._id)}  className="btn rounded px-3 py-1 bg-danger fw-bold text-light mx-1" ><FontAwesomeIcon icon={faTrashAlt}/></Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
              </div>
        </div>
    );
};

export default ManageRating;