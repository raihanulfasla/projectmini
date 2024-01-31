import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Button,Avatar } from '@mui/material';
import { errorToast } from './error/Index';
import axios from 'axios';



function preventDefault(event) {

  event.preventDefault();
}

 export default function Orders({setEdit,getProductData,refresh,setRefresh}) {
//   export default function Orders({setEdit}) {
  const[data,setData]=React.useState([])


  //update
  const handleUpdate =async(id) => {
    console.log("update")

    //edit
    setEdit(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/product/${id}`);

      getProductData(response.data.product)

      console.log(response, "res api");

    } catch (error) {
      errorToast(error.message)
    }

  }



  //delete
  const handleDelete = async (id)=>{

try{

  const response= await axios.delete(`http://localhost:3000/api/product/${id}`);
  const responseData=response.data;
  setData(response.data.product);
  console.log(response,"res api")
  setRefresh(!refresh)
    
} catch(error){
  errorToast(error.message)
}


  }
   







  const fetchData=async () =>{

    try{
      
    
const response=await axios.get('http://localhost:3000/api/product/');
const responseData=response.data;
setData(response.data.product);

    } catch(error){
      errorToast(error.message)
    }

  }
  React.useEffect(()=>{
    fetchData()
  },[refresh])

  return (

    <React.Fragment>
      <Title>PRODUCTS</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Rate</TableCell>
              <TableCell></TableCell> 
              <TableCell></TableCell> 
            {/* <TableCell align="right">Sale Amount</TableCell> */} 
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow key={row?._id}>
              <TableCell>{row?.Productname}</TableCell>
              <TableCell> <Avatar alt="Remy Sharp" src={`http://localhost:3000/${row?.profile}`}/></TableCell>
                <TableCell>{row?. Productdescription}</TableCell>
              <TableCell>{row?.Productrate}</TableCell>
              <TableCell><Button style={{color:"blue"}}onClick={()=>handleUpdate(row._id)}>EDIT</Button></TableCell>
              <TableCell><Button onClick={()=>handleDelete(row._id)}>DELETE</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}

