import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { errorToast , successToast} from '../error/Index';
import axios from 'axios';



import { useNavigate } from 'react-router-dom';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
//2


const navigate=useNavigate();   //connecting backent routing login


const firstNameRef=React.useRef()
const lastNameRef=React.useRef()
const emailNameRef=React.useRef()

const passwordNameRef=React.useRef()


//first
  const handleSubmit = async(event) => { //async for await
    event.preventDefault();

    const patternForName= /^[a-zA-Z\s]+$/
    const patternForEmail=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const patternForPassword=/^[a-zA-Z0-9!@#$%^&*]{6,16}$/


    // console.log(firstNameRef.current.value)
    // console.log(lastNameRef.current.value)
    // console.log(emailNameRef.current.value)
    // console.log(passwordNameRef.current.value)


    

    const firstNameValue=firstNameRef.current.value
    const lastNameValue=lastNameRef.current.value
    const emailNameValue=emailNameRef.current.value
    const passwordNameValue=passwordNameRef.current.value

    console.log(firstNameValue.length>3&&firstNameValue.length<16,'firstNameValue')
    




    if(firstNameRef.current.value===''){
      /*console.log*/errorToast('first name is required')
      return false
    }





    if(!(firstNameValue.length >= 3 && firstNameValue.length<=16)){

      /*alert*/errorToast("first name should be between 4 and 15 characters")
      return false

    }

    // const patternForName=/^[A-Za-z]/i
    if(!(patternForName.test(firstNameValue))){

      errorToast("invalid name")
      return false

    }


    //lastname

    console.log(lastNameValue.length>3&&lastNameValue.length<16,'lastNameValue')
    




    if(lastNameRef.current.value===''){
      /*console.log*/errorToast('last name is required')
      return false
    }





    if(!(lastNameValue.length >= 3 && lastNameValue.length<=16)){

      /*alert*/errorToast("last name should be between 4 and 15 characters")
      return false

    }

    // const patternForName=/^[A-Za-z]/i
    if(!(patternForName.test(lastNameValue))){

      errorToast("invalid name")
      return false

    }


    //email


    console.log(emailNameValue.length> 8 &&emailNameValue.length< 24,'emailNameValue')
    




    if(emailNameRef.current.value===''){
      /*console.log*/errorToast('email is required')
      return false
    }





    if(!(emailNameValue.length >= 8 && emailNameValue.length<=24)){

      /*alert*/errorToast("email should be between 8and 22 characters")
      return false

    }

    
    if(!(patternForEmail.test(emailNameValue))){

      errorToast("invalid email")
      return false

    }


    //password


    console.log(passwordNameValue.length> 8 &&passwordNameValue.length< 16,'passwordNameValue')
    




    if(passwordNameRef.current.value===''){
      /*console.log*/errorToast('password is required')
      return false
    }





    if(!(passwordNameValue.length >= 8 && passwordNameValue.length<=16)){

      /*alert*/errorToast("password should be between 8and 12characters")
      return false

    }

    
    if(!(patternForPassword.test(passwordNameValue))){

      errorToast("invalid password")
      return false

    }

//for connecting backend





try{



  const data={

    firstname:firstNameValue,
    lastname:lastNameValue,
    email:emailNameValue,
    password:passwordNameValue,  // payload


  }


  let response= await axios.post("http://localhost:3000/api/register/",data)

  navigate("/signinside") //backend routing login

  console.log(response,'response for api');
  const resData=response.data
  successToast(resData.message)
}catch(error){

  successToast(error.message);
}

//connecting above




    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  //3
                  inputRef={firstNameRef}
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required

                inputRef={lastNameRef}

                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  inputRef={emailNameRef}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  inputRef={passwordNameRef}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}