import { useState, useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Aside from "../../components/Aside";
import * as React from "react";

import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";

import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";

import axios from "axios";
import { format } from "date-fns";

import MenuItem from "@mui/material/MenuItem";
import { typesDeCours } from "../../utils/common-objects";

import { Audio } from "react-loader-spinner";
import Toggle from "react-toggle";

import { useNavigate } from "react-router-dom";

function AjouterCours() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [titre, setTitre] = useState("");
  const [coursIds, setCoursIds] = useState([]);
  const [prix_horaire, setPrix_horaire] = useState("");
  const [debut, setDebut] = useState("");
  const [fin, setFin] = useState("");
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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
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
        let data = response.data;
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

  const intToDayDate = (index) => {
    if (index === 0) {
      return 6;
    }
    if (index === 1) {
      return 0;
    }
    if (index === 2) {
      return 1;
    }
    if (index === 3) {
      return 2;
    }
    if (index === 4) {
      return 3;
    }
    if (index === 5) {
      return 4;
    }
    if (index === 6) {
      return 5;
    }
  };

  const handleBulkCreation =  () => {
    //TODO push des arrays au lieu de post dans des boucles
    //Faire un call par jour
    const debut_periode = new Date(debutPeriode);
    const fin_periode = new Date(finPeriode);
    const dataCoursToSave = {
      titre,
      profe_id,
      prix_horaire,
      debut_de_coure: "",
      fin_de_coure: "",
    };

    /*dataElevesToSave.map(value => {
      const compteCoursDataToSave = {
        membre_id : value.id 
        coure_id : 
      }
    })*/

    let nombreDeJours = (fin_periode - debut_periode) / 1000 / 3600 / 24;

    //gestion erreurs
    if (elevesDuCours.length <1) {
      setErrorMessage("Veuillez ajouter au moins un eleve");
      return;
    }

    if (!titre) {
      setErrorMessage("Veuillez choisir un instrument");
      return;
    } else {
      setErrorMessage("");
    }
    if (!profe_id) {
      setErrorMessage("Veuillez ajouter le professeur");
      return;
    } else setErrorMessage("");
    if (!prix_horaire) {
      setErrorMessage("Veuillez entrer le prix horaire");
      return;
    } else setErrorMessage("");

    if (
      dayOfCour.find((value) => {
        return value === "true";
      })
    ) {
      setErrorMessage("");
    } else {
      setErrorMessage("Veuillez chosir au moins un jour de la semaine");
      return;
    }

    if (elevesDuCours) {
      setErrorMessage("");
    } else {
      setErrorMessage("Ajouter au moins un éléve");
      return;
    }
    setIsLoading(true);
    let coursTimes = [] 

    for(let i=0;i<=nombreDeJours;i++){
      let dd= new Date(debutPeriode);
      dd.setDate(dd.getDate()+i);
      let df=new Date(dd);
      if(dayOfCour[intToDayDate(dd.getDay())]=== "true"){
       
        console.log(hebdoTimes[intToDayDate(dd.getDay())])
        dd.setHours(hebdoTimes[intToDayDate(dd.getDay())].debut.split(':')[0])
        let n = hebdoTimes[intToDayDate(dd.getDay())].debut.split(':')[1]
        dd.setMinutes(n)

        df.setHours(hebdoTimes[intToDayDate(dd.getDay())].fin.split(':')[0])
        let m = hebdoTimes[intToDayDate(dd.getDay())].fin.split(':')[1]
        df.setMinutes(m)

        coursTimes.push({
          debut_de_cour : dd.toISOString(),
          fin_de_cour : df.toISOString()
        })
      }
    }
    console.log(coursTimes)
    axios
      .post(process.env.REACT_APP_API_URL + "/cours/bulk", {
        titre: titre,
        prix_horaire: prix_horaire,
        profe_id: profe_id,
        eleves: elevesDuCours,
        cours_times: coursTimes,
      })
      .then(() => {
        setIsLoading(false);
        //navigate("/admin/cours", { replace: true });
      });
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
    <div className="w-full border-t flex flex-col">
      <main className="w-full flex-grow p-6">
        <div className="bg-gray-100 font-family-karla flex">
          {successMessage && (
            <div className="text-green-500 mt-4">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="text-red-500 mt-4">{errorMessage}</div>
          )}
        </div>
        {isLoading ? (
          <Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="loading"
          />
        ) : (
          <>
            <button
              className="bg-green-500 p-3 text-white"
              onClick={() => {
                setIsOneCours(!isOneCours);
              }}
            >
              {!isOneCours ? "Ajouter un cours" : "Ajouter un cours redondant"}
            </button>
            {!isOneCours && (
              <div>
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
                  type="number"
                  label="Prix Horaire"
                  value={prix_horaire}
                  onChange={(e) =>
                    setPrix_horaire(e.target.value.replace(",", "."))
                  }
                />
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
                    //TODO handle meme jours dans période
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
                    //TODO handle meme jours dans période
                    if (
                      new Date(e.target.value) - new Date(debutPeriode) <=
                      0
                    ) {
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
                                  step="900"
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    if (
                                      e.target.value.includes(":") &&
                                      e.target.value.length === 5
                                    ) {
                                      let newHebdoTimes = hebdoTimes;
                                      newHebdoTimes[index].debut =
                                        e.target.value;
                                      setHebdoTimes(newHebdoTimes);
                                      console.log(newHebdoTimes);
                                      setErrorMessage("");
                                    } else {
                                      setErrorMessage(
                                        "Format de temps incorrect pour un jour de la semaine"
                                      );
                                    }
                                  }}
                                />
                                <input
                                  required
                                  label="Heure de la journée Fin du cours"
                                  type="time"
                                  step="900"
                                  onChange={(e) => {
                                    console.log(e.target.value.length);
                                    if (
                                      e.target.value.includes(":") &&
                                      e.target.value.length === 5
                                    ) {
                                      let newHebdoTimes = hebdoTimes;
                                      newHebdoTimes[index].fin = e.target.value;
                                      setHebdoTimes(newHebdoTimes);
                                      setErrorMessage("");
                                    } else {
                                      setErrorMessage(
                                        "Format de temps incorrect pour un jour de la semaine"
                                      );
                                    }
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
                              src="/images/Delete.svg"
                              className="cursor-pointer"
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
                      <select
                        multiple={true}
                        onChange={(e) => handleAjoutEleve(e)}
                      >
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

                <button
                  className="bg-green-500"
                  onClick={() => {
                     handleBulkCreation();
                  }}
                >
                  Enregistrer
                </button>
              </div>
            )}

            {isOneCours && (
              <>
                <h1 className="text-3xl text-black pb-6">Ajouter Un Cours</h1>

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
                        type="number"
                        label="Prix Horaire"
                        value={prix_horaire}
                        onChange={(e) =>
                          setPrix_horaire(e.target.value.replace(",", "."))
                        }
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
                  {}

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
                </form>
              </>
            )}
          </>
        )}
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

/* <div className="flex flex-wrap -mx-3 mb-6">
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

/* <div className="flex flex-wrap -mx-3 mb-6">
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
