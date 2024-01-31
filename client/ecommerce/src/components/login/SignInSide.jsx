import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { errorToast, successToast } from '../error/Index';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import {WarnToast} from '../error/Index';

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

export default function SignInSide() {

  const navigate=useNavigate();  

  const emailNameRef=React.useRef()
  const passwordNameRef=React.useRef()




  const handleSubmit = async(event) => {
    event.preventDefault();

    
    const patternForEmail=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const patternForPassword=/^[a-zA-Z0-9!@#$%^&*]{6,16}$/


  
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
    const emailNameValue=emailNameRef.current.value
    const passwordNameValue=passwordNameRef.current.value
   


    //email


    console.log(emailNameValue.length> 8 &&emailNameValue.length< 22,'emailNameValue')
    




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

//back end



try{



  const data={

    email:emailNameValue,
    password:passwordNameValue,  // payload


  }


  let response= await axios.post("http://localhost:3000/api/login/",data)
  navigate("/dashboard")
  console.log(response,'response for api');
  const resData=response.data
  successToast(resData.message)
}catch(error){

  successToast(error.message);
}







  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                inputRef={emailNameRef}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                inputRef={passwordNameRef}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}