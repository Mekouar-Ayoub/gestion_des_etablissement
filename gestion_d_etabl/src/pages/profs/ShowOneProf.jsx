import { useState, useEffect } from "react";
import Aside from "../../components/Aside";
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import { createTheme } from '@mui/material/styles';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Retour from "../../components/Retour";



const defaultTheme = createTheme();
function ShowProf(){

    const [isSlidOpen, setIsSlidOpen] = useState(false);
    const [errorMessage,setErrorMessage] = useState('');
    const {profId} = useParams();
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

    useEffect(()=> {
        axios.get(process.env.REACT_APP_API_URL+'/profs/'+profId).then((response) => {
            console.log(response.data)
            setNom(response.data.nom)
            setPrenom(response.data.prenom)
            setPassword(response.data.password)
            setTel(response.data.tel)
            setEmail(response.data.email)
            setAdress(response.data.adress)
            setInstrument(response.data.instrument)
            setTarif(response.data.tarif)
            setSolde(response.data.solde)
        })
    },[profId])
    //TODO multiple instruments from select 
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
            .post(process.env.REACT_APP_API_URL+'/profs', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                setSuccessMessage('profe added successfully');
                window.location.href = '/admin/profs';
            })
            .catch((error) => {
                setErrorMessage(error)
                console.log('Error during submission:', error);
            });
    }

    return (
       
                <div className="w-full overflow-x-hidden border-t flex flex-col">
                    <main className="w-full flex-grow p-6">
                    <Retour to='/admin/profs'></Retour>
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
                                        label="Montant à rendre actuel"
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

    );
}

export default ShowProf;