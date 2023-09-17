import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit">
                Qalam Software
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}



const defaultTheme = createTheme();

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setErrorMessage('Please enter all fields');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/memberLogin', {
                email,
                password,
            }
            );
            const type = 2;
            const token = response.data;
            Cookies.set('token',token);
            Cookies.set('headers', type);
            window.location.href = '/';
        } catch (error) {
            if (error) {
                setErrorMessage(error.response.data.message);
            }
        }
    };
    const valuetoke = Cookies.get('token')
    if (valuetoke) {
      return <Navigate to="/" />;
    }
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
                        Sign in member
                    </Typography>
                    {
                        errorMessage && (
                            <p>{errorMessage}</p>
                        )
                    }
                    <Box noValidate sx={{ mt: 1 }}>
                        <div className=' bg-slate-500 flex justify-between h-[50px] rounded'>
                        
                            <button className='bg-blue-600 w-[100%] rounded-r font-bold text-white'><Link to="#">Admin</Link></button>
                        </div>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            autoComplete="email"
                            value={email} onChange={(e) => setEmail(e.target.value)}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            id="password"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/password-retrieve" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
export default SignIn;