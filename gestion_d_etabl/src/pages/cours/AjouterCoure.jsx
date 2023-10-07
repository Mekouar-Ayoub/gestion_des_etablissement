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
import { typesDeCours } from "../../utils/common-objects";
import { TextInput } from "flowbite-react";

const defaultTheme = createTheme();



function AjouterCours() {
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
  const [listeEleves, setListeEleves] = useState([])
  const [elevesDuCours, setElevesDuCours] = useState([]);
  const [eleveSelectionne, setEleveSelectionne] = useState({});

  useEffect(() => {

    axios.get(process.env.REACT_APP_API_URL+'/profs')
      .then(response => {
        const data = response.data;
        setProfes(data);
      })
      .catch(error => {
        console.error(error);
      });
    axios.get(process.env.REACT_APP_API_URL+'/eleves')
      .then(response => {
        const data = response.data;
        setListeEleves(data);
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
        process.env.REACT_APP_API_URL+'/cours',
        data
      );
      setSuccessMessage('Event added successfully');
      window.location.href = '/cours';
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage('Error adding event: ' + error.message);
      setSuccessMessage('');
    }

    //TODO appeller route AddToCoure

  };

  return (
    <div className="bg-gray-100 font-family-karla flex">
      
        <div className="w-full overflow-x-hidden border-t flex flex-col">
          <main className="w-full flex-grow p-6">
            <h1 className="text-3xl text-black pb-6">Ajouter le Cours</h1>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  
                  <TextField
                    required
                    fullWidth
                    id=""
                    label="Type de cours"
                    value={titre}
                    onChange={(e) => setTitre(e.target.value)}
                    select
                  >
                  {Object.values(typesDeCours).map((value,index) => (
                      <MenuItem key={index} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </TextField>
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
              {/* <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <select required fullWidth id="eleves_id"
                    label="Eleves">
                    {listeEleves.map((value) => {
                      return <option key={value.id} onClick={() =>{
                        setEleveSelectionne(value)
                      }} value={value.id}>{value.nom} {value.prenom}</option>
                    })
                    }
                    <button onClick={() => {
                      if(!elevesDuCours.includes(eleveSelectionne)){
                        elevesDuCours.push(eleveSelectionne)
                        console.log('ok')
                      }
                        
                    }}>Ajouter cet éleve au cours</button>
                  </select>
                  
                </div>
                </div> */}
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <ul>
                    {elevesDuCours.map(value => {
                      return <li key={value.id}>{value.nom} {value.prenom}</li>
                    })}
                  </ul>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <TextField
                    required
                    fullWidth
                    id="profe_id"
                    label="Professeur"
                    select
                    value={profe_id}
                    onChange={handleProfeChange}
                    className="text-black"
                  >
                    {profes.map((prof) => (
                      <MenuItem key={prof.id} value={prof.id}>
                        {prof.nom}
                      </MenuItem>
                    ))}
                  </TextField>
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
                    Ajouter le Cours
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
  );
}

export default AjouterCours;


/*
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
                */