import { useState, useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Aside from "../../components/Aside";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { format } from "date-fns";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { typesDeCours } from "../../utils/common-objects";
import { TextInput } from "flowbite-react";

import Toggle from "react-toggle";
import TimePicker from "react-time-picker";
import { Timeit } from "react-timeit";

function AjouterCours() {

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [titre, setTitre] = useState("");
  const [prix_horaire, setPrix_horaire] = useState("");
  const [debut, setDebut] = useState("");
  const [fin, setFin] = useState("");
  const [individuel, setIndividuel] = useState(0);
  const [debutPeriode, setDebutPeriode] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [finPeriode, setFinPeriode] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [profes, setProfes] = useState([]);
  const [profe_id, setProfe_id] = useState("");
  const [listeEleves, setListeEleves] = useState([]);
  const [elevesDuCours, setElevesDuCours] = useState([]);
  const [elevesAjoutable, setElevesAjoutable] = useState([]);
  const [rerender, setRerender] = useState(false);
  const [isOneCours, setIsOneCours] = useState(false);
  const [dayOfCour, setDayOfCour] = useState([
    "false",
    "false",
    "false",
    "false",
    "false",
    "false",
    "false",
  ]);

  const [hebdoTimes, setHebdoTimes] = useState([
    { debut: "", fin: "" },
    { debut: "", fin: "" },
    { debut: "", fin: "" },
    { debut: "", fin: "" },
    { debut: "", fin: "" },
    { debut: "", fin: "" },
    { debut: "", fin: "" },
  ]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/profs")
      .then((response) => {
        const data = response.data;
        setProfes(data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(process.env.REACT_APP_API_URL + "/eleves")
      .then((response) => {
        let data = response.data.data;
        data = data.filter((value) => {
          return value.etudient === 1;
        });
        setElevesAjoutable(data);
        setListeEleves(data);
      })
      .catch((error) => {
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
      fin_de_coure,
      individuel
    };

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/cours",
        data
      );
      setSuccessMessage("Event added successfully");
      window.location.href = "/admin/cours/" + response.data;
      setErrorMessage("");
    } catch (error) {
      console.error(error);
      setErrorMessage("Error adding event: " + error.message);
      setSuccessMessage("");
    }
    //TODO appeller route AddToCoure
  };

  const handleBulkCreation = () => {
    //Faire un call par jour 
    const debut_periode = format(new Date(debutPeriode), "yyyy-MM-dd HH:mm:ss");
    const fin_periode = format(new Date(finPeriode), "yyyy-MM-dd HH:mm:ss");

    difference_In_Time = f - d;
    difference_In_Time / (1000 * 3600 * 24);

  };

  const intToDay = (index) => {
    if (index === 1) {
      return "Lundi";
    }
    if (index === 2) {
      return "Mardi";
    }
    if (index === 3) {
      return "Mercredi";
    }
    if (index === 4) {
      return "Jeudi";
    }
    if (index === 5) {
      return "Vendredi";
    }
    if (index === 6) {
      return "Samedi";
    }
    if (index === 7) {
      return "Dimanche";
    }
  };

  const handleToggle = (index) => {
    let newArray = dayOfCour;
    newArray[index] = newArray[index] === "false" ? "true" : "false";
    setDayOfCour(newArray);
    setRerender(!rerender);
  };

  const handleAjoutEleve = (e) => {
    console.log(e.target.value);
    let newArrayEleves = elevesDuCours;

    axios
      .get(process.env.REACT_APP_API_URL + "/eleves/" + e.target.value)
      .then((response) => {
        newArrayEleves.push(response.data);
        setElevesDuCours(newArrayEleves);
        console.log(response.data);

        let elevesToRemove = elevesAjoutable;
        setElevesAjoutable(
          elevesToRemove.filter((value) => {
            return value.id != e.target.value;
          })
        );
        setRerender(!rerender);
      });
  };

  const handleDeleteEleve = (id) => {
    let newArrayElevesAjoutable = elevesAjoutable;
    axios
      .get(process.env.REACT_APP_API_URL + "/eleves/" + id)
      .then((response) => {
        newArrayElevesAjoutable.push(response.data);
        setElevesAjoutable(newArrayElevesAjoutable);
        let newArrayEleves = elevesDuCours.filter((value) => {
          value.id !== id;
        });
        setElevesDuCours(newArrayEleves);
      });
  };

  return (
    <div className="w-full overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6">
        <div className="bg-gray-100 font-family-karla flex">
          {successMessage && (
            <div className="text-green-500 mt-4">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="text-red-500 mt-4">{errorMessage}</div>
          )}
        </div>
        <button className="bg-green-500 p-3 text-white" onClick={()=> 
        {
          setIsOneCours(!isOneCours)
        }
        }>{!isOneCours ? 'Ajouter un cours' : 'Ajouter un cours redondant'}</button>
        {!isOneCours && <div>
          <h1>Ajouter un Cours redondant</h1>
          <TextField
                required
                fullWidth
                id=""
                label="Instrument"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                select
              >
                {Object.values(typesDeCours).map((value, index) => (
                  <MenuItem key={index} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
        required
        fullWidth
        id="prix_horaire"
        label="Prix Horaire"
        value={prix_horaire}
        onChange={(e) => setPrix_horaire(e.target.value)}
      />
      <select
        required
        fullWidth
        id="prix_horaire"
        label="Cours Individuel ou Collectif"
        onChange={(e) => setIndividuel(e.target.value)}
      >
        <option value={0}>Groupe</option>
        <option value={1}>Individuel</option>
        </select>
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
            {prof.nom} {prof.prenom}
          </MenuItem>
        ))}
      </TextField>
          <TextField
            required
            
            label="Debut de la période"
            type="date"
            value={debutPeriode}
            onChange={(e) => {
              if (new Date(finPeriode) - new Date(e.target.value) <= 0) {
                setErrorMessage("Date de début de période non valide");
              } else {
                setDebutPeriode(e.target.value);
              }
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            required
            
            label="Fin de la période"
            type="date"
            value={finPeriode}
            onChange={(e) => {
              if (new Date(e.target.value) - new Date(debutPeriode) <= 0) {
                setErrorMessage("Date de fin de période non valide");
              } else {
                setFinPeriode(e.target.value);
              }
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <div className="flex">
            {dayOfCour.map((value, index) => {
              return (
                <>
                  <div>
                    <p>{intToDay(index + 1)}</p>
                    <Toggle
                      onClick={() => {
                        handleToggle(index);
                      }}
                    ></Toggle>
                  </div>
                  {value === "true" && (
                    <>
                      <div>
                        <div className="d-block">
                          <input
                            required
                            label="Heure de la journée Début du cours"
                            type="time"
                            step={900}
                            onChange={(value) => {
                              let newHebdoTimes = hebdoTimes;
                              newHebdoTimes[index].debut = value;
                              setHebdoTimes(newHebdoTimes);
                              console.log(newHebdoTimes)
                            }}
                          />
                          <input
                            required
                            label="Heure de la journée Fin du cours"
                            type="time"
                            step={900}
                            onChange={(value) => {
                              let newHebdoTimes = hebdoTimes;
                              newHebdoTimes[index].fin = value;
                              setHebdoTimes(newHebdoTimes);
                              console.log(newHebdoTimes)
                            }}
                          />
                        </div>
                      </div>{" "}
                    </>
                  )}
                </>
              );
            })}
          </div>

          <div>
            {elevesDuCours.length > 0 && (
              <>
                <h2>Liste des eleves Ajoutés</h2>
                {elevesDuCours.map((value) => {
                  return (
                    <div className="flex">
                      <p>
                        {value.nom} {value.prenom}
                      </p>
                      <img
                        src="/Delete.svg"
                        onClick={() => {
                          handleDeleteEleve(value.id);
                        }}
                      ></img>
                    </div>
                  );
                })}
              </>
            )}
          </div>

          <div>
            {elevesAjoutable.length > 0 && (
              <>
                <h2>Liste des eleves Ajoutable</h2>{" "}
                <select multiple={true} onChange={(e) => handleAjoutEleve(e)}>
                  {elevesAjoutable &&
                    elevesAjoutable.map((value) => {
                      return (
                        <option value={value.id}>
                          {value.nom + " " + value.prenom}
                        </option>
                      );
                    })}
                </select>
              </>
            )}
          </div>

          <button className="bg-green-500" onClick={handleBulkCreation}>
            Enregistrer
          </button>
        </div>}
        

       
        {isOneCours && <><h1 className="text-3xl text-black pb-6">Ajouter Un Cours</h1>

<form onSubmit={handleSubmit}>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <TextField
        required
        fullWidth
        id=""
        label="Instrument"
        value={titre}
        onChange={(e) => setTitre(e.target.value)}
        select
      >
        {Object.values(typesDeCours).map((value, index) => (
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
        </div> 
        
        
        <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <ul>
        {elevesDuCours.map((value) => {
          return (
            <li key={value.id}>
              {value.nom} {value.prenom}
            </li>
          );
        })}
      </ul>
    </div>
  </div>
        */
        //TODO handle ajout d'eleves
        
        }
  
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
            {prof.nom} {prof.prenom}
          </MenuItem>
        ))}
      </TextField>
    </div>
  
  
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <TextField
        required
        fullWidth
        label="Individuel ou Groupe"
        select
        onChange={(e) => setIndividuel(e.target.value)}
      >
        <MenuItem value={0}>Groupe</MenuItem>
        <MenuItem value={1}>Individuel</MenuItem>
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
</form></>}
        
      </main>
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
