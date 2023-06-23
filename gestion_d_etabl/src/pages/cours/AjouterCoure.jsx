import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Aside from "../../components/Aside"
import * as React from 'react';
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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const defaultTheme = createTheme();

function AjouterCoure() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isSlidOpen, setIsslidOpen] = useState(false)
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [titre, setTitre] = useState();
    const [profe_id, setProfe_id] = useState();
    const [prix_horaire, setPrix_horaire] = useState();
    const [debut, setDebut] = useState();
    const [fin, setFin] = useState();
    const options = [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
        { label: 'Option 3', value: 3 },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const debut_de_coure = format(new Date(debut), "yyyy-MM-dd HH:mm:ss");
        const fin_de_coure = format(new Date(fin), "yyyy-MM-dd HH:mm:ss");

        const data = {
            titre,
            profe_id,
            prix_horaire,
            debut_de_coure,
            fin_de_coure
        };
        try {
            const response = await axios.post(
                'http://localhost:8000/api/ajouterEvent',
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
        <div className="bg-gray-100 font-family-karla flex">
            <Aside />
            <div className="w-full flex flex-col h-screen overflow-y-hidden">
                <header className="w-full items-center bg-[#3d68ff] py-2 px-6 hidden sm:flex">
                    <div className="w-1/2"></div>
                    <div className="relative w-1/2 flex justify-end">
                        <button onClick={() => setIsslidOpen(!isSlidOpen)} className="realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none">
                            <img src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400" />
                        </button>
                        {isSlidOpen && (
                            <div className="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16">
                                <a href="#" className="block px-4 py-2 account-link hover:text-white">Account</a>
                                <a href="#" className="block px-4 py-2 account-link hover:text-white">Support</a>
                                <a href="#" className="block px-4 py-2 account-link hover:text-white">Sign Out</a>
                            </div>
                        )}
                    </div>
                </header>
                <header className="w-full bg-sidebar py-5 px-6 sm:hidden">
                    <div className="flex items-center justify-between">
                        <a href="index.html" className="text-white text-3xl font-semibold uppercase hover:text-gray-300">Admin</a>
                        <button className="text-white text-3xl focus:outline-none">
                            <AiOutlineMenu onClick={() => setIsNavOpen(!isNavOpen)} />
                        </button>
                    </div>
                    {isNavOpen && (<nav className="flex flex-col pt-4">
                        <a href="index.html" className="flex items-center active-nav-link text-white py-2 pl-4 nav-item">
                            <i className="fas fa-tachometer-alt mr-3"></i>
                            Dashboard
                        </a>
                        <a href="blank.html" className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                            <i className="fas fa-sticky-note mr-3"></i>
                            Blank Page
                        </a>
                        <a href="tables.html" className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                            <i className="fas fa-table mr-3"></i>
                            Tables
                        </a>
                        <a href="forms.html" className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                            <i className="fas fa-align-left mr-3"></i>
                            Forms
                        </a>
                        <a href="tabs.html" className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                            <i className="fas fa-tablet-alt mr-3"></i>
                            Tabbed Content
                        </a>
                        <a href="calendar.html" className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                            <i className="fas fa-calendar mr-3"></i>
                            Calendar
                        </a>
                        <a href="#" className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                            <i className="fas fa-cogs mr-3"></i>
                            Support
                        </a>
                        <a href="#" className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                            <i className="fas fa-user mr-3"></i>
                            My Account
                        </a>
                        <a href="#" className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                            <i className="fas fa-sign-out-alt mr-3"></i>
                            Sign Out
                        </a>
                        <button className="w-full bg-white cta-btn font-semibold py-2 mt-3 rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
                            <i className="fas fa-arrow-circle-up mr-3"></i> Upgrade to Pro!
                        </button>
                        < button className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center" >
                            <i className="fas fa-plus mr-3"></i> New Report
                        </button >
                    </nav>
                    )}
                </header >
                <div className="w-full overflow-x-hidden border-t flex flex-col">
                    <main className="w-full flex-grow p-6">
                        <div className="w-full ">
                            <div className="bg-white overflow-auto">
                                <ThemeProvider theme={defaultTheme}>
                                    <p>{errorMessage}</p>
                                    <Container component="main" maxWidth="xs">
                                        <CssBaseline />
                                        <Box
                                            sx={{

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
                                                <label htmlFor="">titre de coure</label>
                                                <TextField
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    type="text"
                                                    value={titre}
                                                    onChange={(e) => setTitre(e.target.value)}
                                                />
                                                <label htmlFor="">prix horaire</label>
                                                <TextField
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    type="number"
                                                    value={prix_horaire}
                                                    onChange={(e) => setPrix_horaire(e.target.value)}
                                                />
                                                <label htmlFor="">debut de coure</label>
                                                <TextField
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    type="datetime-local"
                                                    value={debut}
                                                    onChange={(e) => setDebut(e.target.value)}
                                                />
                                                <label htmlFor="">fin de coure</label>
                                                <TextField
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    type="datetime-local"
                                                    value={fin}
                                                    onChange={(e) => setFin(e.target.value)}
                                                />
                                                <label htmlFor="">profe de coure</label>
                                                <br />
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    fullWidth
                                                    id="demo-simple-select"
                                                    label="Age"   
                                                >
                                                    <MenuItem value={10}>Ten</MenuItem>
                                                    <MenuItem value={20}>Twenty</MenuItem>
                                                    <MenuItem value={30}>Thirty</MenuItem>
                                                </Select>
                                                <br />
                                                <Button
                                                    onClick={handleSubmit}

                                                    variant="contained"
                                                    sx={{ mt: 3, mb: 2 }}
                                                >
                                                    Ajouter
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Container>
                                </ThemeProvider>
                            </div>
                        </div>
                    </main>
                </div>
            </div >
        </div>
    );
}
export default AjouterCoure;