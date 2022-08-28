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
import { signIn } from './functions/index'
import { Redirect, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Alert, Snackbar } from '@mui/material';

const theme = createTheme();

export default function SignIn() {
  const history = useHistory()
  let isLoggedIn = false
  const [emailErrorText, setEmailErrorText] = useState("")
  const [passErrorText, setPassErrorText] = useState("")
  const [snackbar, setSnackbar] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  useEffect(()=> {
    const token = localStorage.getItem('access_token')
    if(token){
      console.log(token)
      isLoggedIn = true
    }
  },[])

  const handleSubmit = async(event) => {
    event.preventDefault();
    setEmailErrorText("")
    setPassErrorText("")
    const data = new FormData(event.currentTarget);
    const sendData = {
      email: data.get('email'),
      password: data.get('password'),
    }
    
    if (sendData.email == ""){
      setEmailErrorText("Please enter your email")
    }
    if (sendData.password == ""){
      setPassErrorText("Please enter your password")
    } 
    
    if(emailErrorText.length!==0 || passErrorText.length!==0) {
      return console.log("error")
    }else{
   
      const result = await signIn(sendData)
      console.log(result)

      if (result.status == 200){
        localStorage.setItem("access_token", result.token)
        history.push('/')
        window.location.reload()
      }else{
        setSnackbar(true)
        setErrorMessage(result.data.message)
        console.log(result.data.message)
      }

      
    }
  };
  
  const handleCloseSnackbar = () => {
    setSnackbar(false);
  };

  const vertical = "top"
  const horizontal = "right"
  return (
    <ThemeProvider theme={theme}>
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
          <Typography component="h1" variant="h3" >
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={(emailErrorText.length!==0)? true:false}
              helperText={emailErrorText}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={(passErrorText.length!==0)? true:false}
              helperText={passErrorText}
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
            {/* <Grid container>
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
            </Grid> */}
          </Box>
        </Box>
      </Container>
      {snackbar && <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snackbar}
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        key={"top" + "right"}
      >
        <Alert 
          onClose={handleCloseSnackbar}  
          severity="error"
        >
          {errorMessage}
        </Alert>
      </Snackbar>}
    </ThemeProvider>
  );
}
