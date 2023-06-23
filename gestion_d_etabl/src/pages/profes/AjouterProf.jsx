import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';


const defaultTheme = createTheme();
function AjouterProf() {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [tel, setTel] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [adress, setAdress] = useState('');
    const [instrument, setInstrument] = useState('');
    const [cv, setCv] = useState('');
    const [tarif, setTarif] = useState('');
    const [solde, setSolde] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const handelCvChange = (e) => {
        setCv(e.target.files[0])
    }

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('prenom', prenom);
        formData.append('tel', tel);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('adress', adress);
        formData.append('instrument', instrument);
        formData.append('cv', cv);
        formData.append('tarif', tarif);
        formData.append('solde', solde);
        axios
            .post('http://localhost:8000/api/AjouterProfe', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                setSuccessMessage('profe added successfully');
            })
            .catch((error) => {
                console.log('Error during submission:', error);
            });
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar className='bg-blue-600' sx={{ m: 1, bgcolor: 'rgb(30, 136, 229)' }}>
                        <PersonAddIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        ajouter un prof
                    </Typography>
                    {successMessage && <p className="text-green-500">{successMessage}</p>}
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2} >
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="nom"
                                    required
                                    fullWidth
                                    id="nom"
                                    label="nom"
                                    autoFocus
                                    value={nom} onChange={(e) => setNom(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="prenom"
                                    label="prenom"
                                    name="prenom"
                                    autoComplete="prenom"
                                    value={prenom} onChange={(e) => setPrenom(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="tel"
                                    label="tel"
                                    name="tel"
                                    autoComplete="tel"
                                    value={tel} onChange={(e) => setTel(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="email"
                                    label="email"
                                    type="email"
                                    id="email"
                                    autoComplete="email"
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="adress"
                                    label="adress"
                                    type="text"
                                    id="adress"
                                    autoComplete="adress"
                                    value={adress} onChange={(e) => setAdress(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="instrument"
                                    label="instrument"
                                    type="text"
                                    id="instrument"
                                    autoComplete="instrument"
                                    value={instrument} onChange={(e) => setInstrument(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="cv"
                                    type="file"
                                    onChange={handelCvChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="tarif"
                                    label="tarif"
                                    type="text"
                                    id="tarif"
                                    autoComplete="tarif"
                                    value={tarif} onChange={(e) => setTarif(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="solde"
                                    label="solde"
                                    type="text"
                                    id="solde"
                                    autoComplete="solde"
                                    value={solde} onChange={(e) => setSolde(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmit}
                        >
                            Ajouter
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default AjouterProf;