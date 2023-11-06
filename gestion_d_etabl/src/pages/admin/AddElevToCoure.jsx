import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { TransformEtat, typesDeCours } from "../../utils/common-objects";
import Retour from "../../components/Retour";

function AddEleveToCours() {
  const [navigate, setNavigate] = useState(false);
  const { courId } = useParams();
  const [eleves, setEleves] = useState([]);
  const [elevesToShow, setElevesToShow] = useState([]);
  const [elevesDansCours, setElevesDansCours] = useState([]);
  const [successMessage, setSuccessMessage] = useState();
  const [cour, setCour] = useState();
  const [profName, setProfName] = useState();
  const [isModifyingEtat, setIsModifyinEtat] = useState(false);
  const [etat, setEtat] = useState();
  const [profs, setProfs] = useState();
  const [searchInput, setSearchInput] = useState("");

  //TODO search and paginate

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/cours/" + courId)
      .then((CoursResponse) => {
        setCour(CoursResponse.data);
        console.log(CoursResponse.data);
        setEtat(CoursResponse.data);
        axios
          .get(
            process.env.REACT_APP_API_URL +
              "/cours/" +
              CoursResponse.data.id +
              "/eleves"
          )
          .then((coursEleveResponse) => {
            let coursEleveData = coursEleveResponse.data.membres;
            setElevesDansCours(coursEleveData);

            axios
              .get(process.env.REACT_APP_API_URL + "/eleves")
              .then((allElevesResponse) => {
                let data = allElevesResponse.data;
                data = data.filter((value) => {
                  return value.etudient === 1;
                });

                data = data.filter((eleve) => {
                  return !coursEleveData.find((eleveDansCours) => {
                    return eleveDansCours.id === eleve.id;
                  });
                });
                setEleves(data);
                setElevesToShow(data);
                axios
                  .get(
                    process.env.REACT_APP_API_URL + "/cours/" + courId + "/prof"
                  )
                  .then((coursWithProf) => {
                    console.table(coursWithProf.data);
                    setProfName(
                      "" +
                        coursWithProf.data.profe.nom +
                        " " +
                        coursWithProf.data.profe.prenom
                    );
                  });
              });
          });
      })
      .catch((error) => {
        console.log(error);
      });
    axios.get(process.env.REACT_APP_API_URL + "/profs").then((response) => {
      setProfs(response.data);
      console.log(response.data);
    });
  }, [courId, navigate]);

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
    if (e.target.value === "") {
      setElevesToShow(eleves);
    } else {
      setElevesToShow(
        eleves.filter((value) => {
          return (
            value.nom.toLowerCase().includes(e.target.value.toLowerCase()) ||
            value.prenom.toLowerCase().includes(e.target.value.toLowerCase())
          );
        })
      );
    }
  };

  const handleSubmit = (membre_id, coure_id) => {
    axios
      .post(process.env.REACT_APP_API_URL + "/cours/" + courId + "/eleves", {
        membre_id,
        coure_id,
      })
      .then((response) => {
        setSuccessMessage("L'étudiant a bien été ajouté au cours");
      })
      .catch((error) => {
        console.log(error);
      });
    setNavigate(!navigate);
  };

  const handleOnRemoveFromCours = (idEleve) => {
    axios.delete(
      process.env.REACT_APP_API_URL + "/cours/" + cour.id + "/eleves/" + idEleve
    );
    setNavigate(!navigate);
  };

  return (
    <div className="bg-gray-100 font-family-karla flex">
      <div className="w-full  border-t flex flex-col">
      <Retour to="/admin/cours" />
        <main className="w-full flex-grow p-6">
          <div className="w-full mt-12">
            {isModifyingEtat ? (
              <>
                <div>
                  <label>Cours de </label>
                  <select
                    value={cour.titre}
                    onChange={(e) => {
                      let newCour = cour;
                      newCour.titre = e.target.value;
                      setCour(newCour);
                    }}
                  >
                    {Object.values(typesDeCours).map((optionItem) => {
                      return <option value={optionItem}>{optionItem}</option>;
                    })}
                  </select>{" "}
                  du{" "}
                  <input
                    value={cour.debut_de_coure}
                    className="bg-stone-400"
                    type="text"
                    onChange={(e) => {
                        //TODO check
                        console.log(e.target.value)
                    }}
                  />{" "}
                  au{" "}
                  <input
                    
                    className="bg-stone-400"
                    value={cour.fin_de_coure}
                    type="text"
                    onChange={(e) => {
                        //TODO check
                        console.log(e.target.value)
                    }}
                  />{" "}
                  par le Professeur
                  <select
                    onChange={(e) => {
                      let newCour = cour;
                      newCour.profe_id = e.target.value;
                      setCour(newCour);
                    }}
                  >
                    {profs.map((value) => {
                      return (
                        <option key={value.id} value={value.id}>
                          {value.nom + " " + value.prenom}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  Statut
                  <select
                    value={etat}
                    className="bg-white"
                    onChange={(event) => {
                      setEtat(parseInt(event.target.value));
                    }}
                  >
                    <option value={0}>Programmé</option>
                    <option value={1}>Annulé</option>
                    <option value={2}>Effectué</option>
                  </select>
                  <br />
                </div>
                <button
                  className="bg-green-400 p-3"
                  onClick={() => {
                    //TODO SAVE
                    setIsModifyinEtat(false);
                    console.log(etat);

                    let newCours = cour;
                    newCours.etat = etat;
                    console.log(newCours);
                    setCour(newCours);
                    axios
                      .put(
                        process.env.REACT_APP_API_URL + "/cours/" + courId,
                        newCours
                      )
                      .catch((error) => {
                        console.error(error);
                      });
                  }}
                >
                  Enregistrer
                </button>{" "}
              </>
            ) : (
              <>
                {cour && (
                  <h1>
                    Cours de {cour.titre} du {cour.debut_de_coure} au{" "}
                    {cour.fin_de_coure} par le Professeur {profName}
                  </h1>
                )}
                <div>
                  <h2>Statut {cour ? "" + TransformEtat(cour.etat) : ""}</h2>

                  <div>
                    <p></p>

                    <button
                      onClick={() => {
                        setIsModifyinEtat(true);
                      }}
                      className="bg-green-400 p-3 hover:"
                    >
                      Modifier
                    </button>
                  </div>
                </div>
              </>
            )}
            <div>
              <div className="w-full  border-t flex flex-col">
                <div className="w-full mt-12">
                  <p className="text-xl pb-3 flex items-center">
                    <i className="fas fa-list mr-3"></i>Tout les élèves qui sont
                    dans le cours
                  </p>
                </div>
                <div className="bg-white ">
                  <table className="min-w-full bg-white">
                    <thead className="bg-gray-800 text-white">
                      <tr>
                        <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                          Name
                        </th>
                        <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                          Last name
                        </th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                          Phone
                        </th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                          Email
                        </th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                          action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      {elevesDansCours.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td className="w-1/3 text-left py-3 px-4">
                              {item.prenom}{" "}
                            </td>
                            <td className="w-1/3 text-left py-3 px-4">
                              {item.nom}
                            </td>
                            <td className="text-left py-3 px-4">
                              <a
                                className="hover:text-blue-500"
                                href="tel:622322662"
                              >
                                {item.tel}
                              </a>
                            </td>
                            <td className="text-left py-3 px-4">
                              <a
                                className="hover:text-blue-500"
                                href="mailto:jonsmith@mail.com"
                              >
                                {item.email}
                              </a>
                            </td>
                            <td className="text-left py-3 px-4">
                              <button
                                className="hover:text-blue-500"
                                onClick={() => handleOnRemoveFromCours(item.id)}
                              >
                                Retirer du cours
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <p className="text-xl pb-3 flex items-center">
              <i className="fas fa-list mr-3"></i>Tout les élèves qui ne sont
              pas dans le cours
            </p>
            <div className="bg-white ">
              <input
                value={searchInput}
                onChange={handleSearchInput}
                className="border-2 mb-[2%]"
              ></input>
              <label>Chercher par Nom Prénom</label>
              <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                      Name
                    </th>
                    <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                      Last name
                    </th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Phone
                    </th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Email
                    </th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                      action
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {elevesToShow.map((item) => (
                    <tr key={item.id}>
                      <td className="w-1/3 text-left py-3 px-4">
                        {item.prenom}{" "}
                      </td>
                      <td className="w-1/3 text-left py-3 px-4">{item.nom}</td>
                      <td className="text-left py-3 px-4">
                        <a className="hover:text-blue-500" href="tel:622322662">
                          {item.tel}
                        </a>
                      </td>
                      <td className="text-left py-3 px-4">
                        <a
                          className="hover:text-blue-500"
                          href="mailto:jonsmith@mail.com"
                        >
                          {item.email}
                        </a>
                      </td>
                      <td className="text-left py-3 px-4">
                        <button
                          className="hover:text-blue-500"
                          onClick={() => {
                            handleSubmit(item.id, courId);
                          }}
                        >
                          Ajouter au cours
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
export default AddEleveToCours;

/*
{etatCours.map((etatValue,index) => {
                                    <option key={'etat'+index} value={etatValue}>{etatValue}</option>
                                })}
                                */
