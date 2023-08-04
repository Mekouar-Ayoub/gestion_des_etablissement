import { useState, useEffect } from "react";
import Aside from "../../components/Aside";
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import { createTheme } from '@mui/material/styles';
import axios from 'axios';



const defaultTheme = createTheme();

function AjouterCoure() {
    const [isSlidOpen, setIsSlidOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
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
        formData.append('password', ''+ nom+ '.' + prenom+ "485!$");
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
                window.location.href = '/profes/DisplayProfe';
            })
            .catch((error) => {
                console.log('Error during submission:', error);
            });
    }

    return (
        <div className="bg-gray-100 font-family-karla flex">
            <Aside />
            <div className="w-full flex flex-col h-screen overflow-y-hidden">
                <header className="w-full items-center bg-[#3d68ff] py-2 px-6 hidden sm:flex">
                    <div className="w-1/2"></div>
                    <div className="relative w-1/2 flex justify-end">
                        <button onClick={() => setIsSlidOpen(!isSlidOpen)} className="realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none">
                            <img src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400" alt="avatar" className="w-full h-full object-cover object-center" />
                        </button>
                        {isSlidOpen && (
                            <div className="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16 z-50">
                                <a href="#" className="block px-4 py-2 account-link hover:text-white">Account</a>
                                <a href="#" className="block px-4 py-2 account-link hover:text-white">Support</a>
                                <a href="#" className="block px-4 py-2 account-link hover:text-white">Sign Out</a>
                            </div>
                        )}
                    </div>
                </header>
                <div className="w-full overflow-x-hidden border-t flex flex-col">
                    <main className="w-full flex-grow p-6">
                        <h1 className="text-3xl text-black pb-6">Ajouter Un Professeur</h1>
                        <form >
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <TextField
                                        required
                                        fullWidth
                                        id="nom"
                                        label="nom"
                                        value={nom} onChange={(e) => setNom(e.target.value)}
                                    />
                                </div>
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <TextField
                                        required
                                        fullWidth
                                        id="prenom"
                                        label="prenom"
                                        value={prenom} onChange={(e) => setPrenom(e.target.value)}
                                    />
                                </div>
                                
                                
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="email"
                                        type="text"
                                        value={email} onChange={(e) => setEmail(e.target.value)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <span className="hidden"><TextField
                                
                                        required
                                        fullWidth
                                        id="password"
                                        label="password"
                                        value={password} onChange={(e) => setPassword(e.target.value)}
                                    /></span>
                                    <p>Le mot de passe de connexion pour le professeur est sous la forme : nom.prenom485!$</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <TextField
                                        required
                                        fullWidth
                                        id="tel"
                                        label="téléphone"
                                        type="phone"
                                        value={tel} onChange={(e) => setTel(e.target.value)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <TextField
                                        
                                        fullWidth
                                        id="CV"
                                        label="Cv"
                                        type="file"

                                        onChange={handelCvChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <TextField
                                        required
                                        fullWidth
                                        id="adress"
                                        label="adresse complète"
                                        type="text"
                                        value={adress} onChange={(e) => setAdress(e.target.value)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <TextField
                                        required
                                        fullWidth
                                        id="instrument"
                                        label="instrument"
                                        type="text"
                                        value={instrument} onChange={(e) => setInstrument(e.target.value)}

                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <TextField
                                        required
                                        fullWidth
                                        id="tarif"
                                        label="tarif horaire en DHS"
                                        type="number"
                                        value={tarif} onChange={(e) => setTarif(e.target.value)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <TextField
                                        required
                                        fullWidth
                                        id="solde"
                                        label="Solde Initial"
                                        type="number"

                                        value={solde} onChange={(e) => setSolde(e.target.value)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-2">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <Button
                                    onClick={handleSubmit}
                                        variant="contained"
                                        color="primary"
                                        startIcon={<InsertInvitationIcon />}
                                    >
                                        Ajouter Le professeur
                                    </Button>
                                </div>
                            </div>
                            {successMessage && (
                                <div className="text-green-500 mt-4">{successMessage}</div>
                            )}
                            {errorMessage && (
                                <div className="text-red-500 mt-4">{errorMessage}</div>
                            )}
                        </form>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default AjouterCoure;
