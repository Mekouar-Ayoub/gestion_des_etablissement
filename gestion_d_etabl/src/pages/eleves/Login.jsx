import * as React from 'react';
import { useState } from 'react';
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
import axios from 'axios';
import RoundedButton from '../../components/Rounded-Boutton';
import Cookies from 'js-cookie';

const defaultTheme = createTheme();

function LoginEleve() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  var handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Veuillez remplir tout les champs');
      return;
    }
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + '/eleve/login', {
        email,
        password,
      });
      console.log(response)
      var token = response.data.token;
      var type = 2;
      Cookies.set('token', token);
      Cookies.set('headers', type);
      Cookies.set('eleveId', response.data.id);
      window.location.href = '/eleve/dashboard';
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        console.log(error)
        setErrorMessage('Email ou Mot de Passe Invalide');
      }
    }
  };

  return (


    <div className='flex ' style={{ backgroundImage: "url('/bg for blue symphony.jpg')" }}>
      <div className='w-[60%] mt-[10%] pb-[11%] ml-[10%]'>
        <img src='/images/logo_blue_symphony.svg'></img>
      </div>
      <div className='h-[100%] mt-[5%] border-2 mr-[10%] ml-[10%] student-border'
      >
        <div className='flex justify-center mt-[5%]'>

          <Link to="/eleve/login">
            <RoundedButton text={'Eleve'} type='login' className='student-background border-2 text-white'>



            </RoundedButton>
          </Link>
          <Link to="/prof/login">
            <RoundedButton text={'Enseignant'} type='login' className={'border-2 hover:bg-blue-400 hover:text-white'}>



            </RoundedButton>
          </Link>

        </div>

        
        <div className=' mt-[10%]'>
          <div className='text-center'>
          <TextField
            margin="normal"
            required
            className='w-[70%] '
            id="email"
            label="Adresse E-Mail"
            autoComplete="email"
            value={email} onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          </div>
<div className='text-center mt-[3%]'>
          <TextField
            margin="normal"
            required
            className='w-[70%] ml-auto mr-auto'
            label="Mot de Passe"
            type="password"
            id="password"
            value={password} onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          </div>
          <div className='ml-[15%] mt-[3%]'>
          <Checkbox></Checkbox>
          <span className='text-stone-600 text-sm mt-[15%]'>Restez connécté</span>
          
          </div>
          {
          errorMessage && (
            <p className='text-red text-center mt-[5%]'>{errorMessage}</p>
          )
        }
          <div className='text-center mt-[10%]'>
            <div onClick={handleSubmit}>
            <RoundedButton
              className={'hover:bg-white hover:text-blue-500 hover:border-2'}
              text="Connection"
              type="student"
            />
            </div>
            <div className='pt-[2%] mb-[10%]'>
              <Link href="/password-reset" variant="body2">
                Mot de passe oublié ?
              </Link>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
export default LoginEleve;