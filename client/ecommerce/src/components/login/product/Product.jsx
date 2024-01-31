import * as React from 'react';            //adding product
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button ,Avatar} from '@mui/material';
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import SendIcon from "@mui/icons-material/Send"
import axios from 'axios';
import { errorToast,successToast } from '../../error/Index';
import styled from '@emotion/styled';

export default function Product({refresh,setRefresh}) {


  //image state

  const [preview, setPreview] = React.useState(null)
  const [image, setImage] = React.useState(null)



  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});







//ref
const Productname=React.useRef(null)
const Productdescription=React.useRef(null)
const Productrate=React.useRef(null)

const handleSubmit=async() => {
  console.log(Productname.current.value);





try{

  const formdata = new FormData();

  formdata.append("Productname", Productname.current.value)
  formdata.append("Productdescription", Productdescription.current.value)
  formdata.append("Productrate", Productrate.current.value)
  formdata.append("image", image)


  const response = await axios.post('http://localhost:3000/api/product/', formdata, {
      headers: {
          'Content-Type': 'multipart/form-data'
      },
  });


//const response=await axios.post("http://localhost:3000/api/product/",data)
const responseData=response.data;
successToast(responseData.message);
setRefresh(!refresh)
}

catch(error) {

  errorToast(error.message)
}
}



const handleImage = (e) => {
  console.log(e.target.files[0],'-----FILRRR');
  setPreview(URL.createObjectURL(e.target.files[0]))
  setImage(e.target.files[0])
}
console.log(image,'---image');


// const MyForm = () => {
//   // State to manage form data
//   const [formData, setFormData] = useState({
//     productname: '',
//     productdescription: '',
//     productrate: '',
//   });

//   // Event handler to update form data on input change
//   const handleInputChange = (e) => {
//     const { productname, value } = e.target;
//     setFormData({
//       ...formData,
//       [productname]: value,
//     });
//   };

//   // Event handler to handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add your form submission logic here using the formData state
//     console.log('Form submitted:', formData);
//   };














  return (
    <>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >

      <h2>ADDING PRODUCT</h2>
      <TextField id="outlined-basic" inputRef={Productname} label="Product name" variant="outlined" />
      <TextField id="filled-basic"  inputRef={Productdescription} label="product description" variant="filled" /> <br />
      <TextField id="standard-basic" inputRef={Productrate} label="Product Rate" variant="outlined" />
      
       <Button  component="label" variant="contained" startIcon={<CloudUploadIcon/>}>
        Upload File
        <VisuallyHiddenInput type="file" accept="image/*" onChange={handleImage} />
        </Button>
       <Button component="label" variant="contained" endIcon={<SendIcon/>} onClick={handleSubmit}>Submit</Button>
      
      
      
      
    </Box>

    <Avatar alt="Remy Sharp" src={preview} />
    </>
  );
}