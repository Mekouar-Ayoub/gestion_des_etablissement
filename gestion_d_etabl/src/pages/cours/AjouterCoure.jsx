import { useState, useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Aside from "../../components/Aside";
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
  const [isSlidOpen, setIsSlidOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [titre, setTitre] = useState('');
  const [prix_horaire, setPrix_horaire] = useState('');
  const [debut, setDebut] = useState('');
  const [fin, setFin] = useState('');
  const [profes, setProfes] = useState([]);
  const [profe_id, setProfe_id] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/showallprofe')
      .then(response => {
        const data = response.data;
        setProfes(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []); // Add an empty dependency array to run the effect only once

  const handleProfeChange = (e) => {
    setProfe_id(e.target.value);
  };

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
        'http://localhost:8000/api/AjouterCoure',
        data
      );
      setSuccessMessage('Event added successfully');
      window.location.href = '/cours/Index';
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
            <button onClick={() => setIsSlidOpen(!isSlidOpen)} className="realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none">
              <img src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400" alt="avatar" className="w-full h-full object-cover object-center" />
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
        <div className="w-full overflow-x-hidden border-t flex flex-col">
          <main className="w-full flex-grow p-6">
            <h1 className="text-3xl text-black pb-6">Ajouter Cour</h1>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <TextField
                    required
                    fullWidth
                    id="titre"
                    label="Titre"
                    value={titre}
                    onChange={(e) => setTitre(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <TextField
                    required
                    fullWidth
                    id="prix_horaire"
                    label="Prix Horaire"
                    value={prix_horaire}
                    onChange={(e) => setPrix_horaire(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <TextField
                    required
                    fullWidth
                    id="debut"
                    label="Début"
                    type="datetime-local"
                    value={debut}
                    onChange={(e) => setDebut(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <TextField
                    required
                    fullWidth
                    id="fin"
                    label="Fin"
                    type="datetime-local"
                    value={fin}
                    onChange={(e) => setFin(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <Select
                    required
                    fullWidth
                    id="profe_id"
                    label="Professeur"
                    value={profe_id}
                    onChange={handleProfeChange}
                  >
                    {profes.map((prof) => (
                      <MenuItem key={prof.id} value={prof.id}>
                        {prof.nom}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<InsertInvitationIcon />}
                  >
                    Ajouter Cour
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
