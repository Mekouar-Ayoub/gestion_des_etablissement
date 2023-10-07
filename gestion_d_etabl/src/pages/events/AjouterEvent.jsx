import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { format } from 'date-fns';


const defaultTheme = createTheme();

function AddEvent() {
    const [titre, setTitre] = useState('');
    const [debut, setDebut] = useState();
    const [fin, setFin] = useState();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();


        const debut_de_event = format(new Date(debut), "yyyy-MM-dd HH:mm:ss");
        const fin_de_event = format(new Date(fin), "yyyy-MM-dd HH:mm:ss");

        const data = {
            titre,
            debut_de_event,
            fin_de_event
        };
        console.log(data)
        try {
            const response = await axios.post(
                process.env.REACT_APP_API_URL+'/events',
                data
            );
            setSuccessMessage('Event added successfully');
            setErrorMessage('');
        } catch (error) {
            console.error(error);
            setErrorMessage('Error adding event: ' + error.message);
            setSuccessMessage('');
        }
    };



    return (
        <ThemeProvider theme={defaultTheme}>
            <p>{errorMessage}</p>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'rgb(30, 136, 229)' }}>
                        <InsertInvitationIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Ajouter event
                    </Typography>
                    {
                        successMessage && (
                            <div className=' text-white bg-green-400 w-full text-center h-12'>
                                <p className='py-3'>{successMessage}</p>
                            </div>
                        )
                    }
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <label htmlFor="">titre de l'event</label>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            value={titre}
                            onChange={(e) => setTitre(e.target.value)}
                        />
                        <label htmlFor="">debut de event</label>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            value={debut}
                            onChange={(e) => setDebut(e.target.value)}
                            type="datetime-local"
                        />
                        <label htmlFor="">fin de event</label>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            value={fin}
                            onChange={(e) => setFin(e.target.value)}
                            type="datetime-local"
                        />
                        <Button
                            onClick={handleSubmit}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Ajouter
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default AddEvent;
