import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import SendIcon from "@mui/icons-material/Send"
import axios from 'axios';
import { errorToast, successToast } from './error/Index';

function Editproduct({ product, setRefresh, refresh }) {



  //ref
  const Productname = React.useRef(null)
  const Productdescription = React.useRef(null)
  const Productrate = React.useRef(null)

  const handleSubmit = async () => {
    console.log(Productname.current.value);





    try {

      const data = {

        Productname: Productname.current.value,
        Productdescription: Productdescription.current.value,
        Productrate: Productrate.current.value

      }

      const response = await axios.put(`http://localhost:3000/api/product/${product._id}`, data);
      const responseData = response.data;

      //edit
      setRefresh(!refresh)
      //
      successToast(responseData.message);
    }

    catch (error) {

      errorToast(error.message)
    }
  }




  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div className="">
        <p>{product.Productname}</p>
        <p>{product.Productdescription}</p>
        <p>{product.Productrate}</p>


      </div>



      <h1>Edit Product</h1>




      <TextField id="outlined-basic" inputRef={Productname} label="Product name" variant="outlined" />
      <TextField id="filled-basic" inputRef={Productdescription} label="product description" variant="filled" /> <br />
      <TextField id="standard-basic" inputRef={Productrate} label="Product Rate" variant="outlined" />

      <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>Upload File</Button>
      <Button component="label" variant="contained" endIcon={<SendIcon />} onClick={handleSubmit}>Edit</Button>




    </Box>
  );
}
export default Editproduct