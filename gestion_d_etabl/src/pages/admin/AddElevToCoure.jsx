import React, { useState, useEffect } from "react";
import axios from "axios";
import {Navigate, useNavigate, useParams } from 'react-router-dom';
import { TransformEtat } from "../../utils/common-objects";
import Retour from "../../components/Retour";


function AddEleveToCours() {
    const [navigate, setNavigate] = useState(false);
    const { courId } = useParams();
    const [eleves, setEleves] = useState([]);
    const [elevesDansCours, setElevesDansCours] = useState([]);
    const [successMessage, setSuccessMessage] = useState();
    const [cour, setCour] = useState();
    const [profName, setProfName] = useState();
    const [isModifyingEtat, setIsModifyinEtat] = useState(false);
    const [etat, setEtat] = useState();

    useEffect(() => {
                axios
                    .get(process.env.REACT_APP_API_URL+'/cours/' + courId)
                    .then(CoursResponse => {
                        setCour(CoursResponse.data)
                        console.log(CoursResponse.data)
                        setEtat(CoursResponse.data)
                        axios.get(process.env.REACT_APP_API_URL+'/cours/' + CoursResponse.data.id + '/eleves').then(
                            coursEleveResponse => {
                                let coursEleveData = coursEleveResponse.data.membres
                                setElevesDansCours(coursEleveData)

                                axios
                                .get(process.env.REACT_APP_API_URL+'/eleves')
                                .then(allElevesResponse => {
                                    let data = allElevesResponse.data.data;
                                    data= data.filter((value) => {
                                        return value.etudient === 1
                                    })
                                    
                                    data = data.filter(eleve => {
                                        return !coursEleveData.find((eleveDansCours) => {
                                            return eleveDansCours.id === eleve.id
                                        }) 
                                    })
                                    setEleves(data)
                                    axios
                                    .get(process.env.REACT_APP_API_URL+'/cours/' + courId+'/prof')
                                    .then(coursWithProf => {
                                        console.table(coursWithProf.data)
                                    setProfName(''+ coursWithProf.data.profe.nom+ ' ' + coursWithProf.data.profe.prenom)
                                    })
                            })
                    })
                    })
            .catch(error => {
                console.log(error);
            })


    }, [courId,navigate])

    const handleSubmit = (membre_id, coure_id) => {
        axios.post(process.env.REACT_APP_API_URL+'/cours/' + courId + '/eleves', {
            membre_id,
            coure_id
        })
            .then((response) => {
                setSuccessMessage("L'étudiant a bien été ajouté au cours")
            })
            .catch((error) => {
                console.log(error);
            })
            setNavigate(!navigate)
        }

    const handleOnRemoveFromCours = (idEleve) => {
        axios.delete(process.env.REACT_APP_API_URL+'/cours/'+cour.id+'/eleves/'+ idEleve);
        setNavigate(!navigate)
    }


    return (
        <div className="bg-gray-100 font-family-karla flex">
            <div className="w-full overflow-x-hidden border-t flex flex-col">
                <main className="w-full flex-grow p-6">
                    <Retour to='/cours' />
                    <div className="w-full mt-12">
                        {cour && <h1>Cours de {cour.titre} du {cour.debut_de_coure} au {cour.fin_de_coure}  par le Professeur {profName}</h1>}
                        <div>
                            <h2>Statut</h2>
                            {isModifyingEtat ? <>
                            <select value={etat} className="bg-white" onChange={(event) => {
                                setEtat(parseInt(event.target.value))
                            }} >
                                <option value={0}>Programmé</option>
                                <option value={1}>Annulé</option>
                                <option value={2}>Effectué</option>
                            </select><br /></> 
                                : <p>{cour ? ''+ TransformEtat(cour.etat) : ''}</p>}
                            {isModifyingEtat ? <button onClick={() => {
                                //TODO SAVE
                                setIsModifyinEtat(false)
                                console.log(etat)
                                
                                let newCours = cour
                                newCours.etat = etat
                                console.log(newCours)
                                setCour(newCours)
                                axios
                                .put(process.env.REACT_APP_API_URL+'/cours/' + courId, newCours).catch(error=> {
                                    console.error(error)
                                })
                            }} >
                            Enregistrer</button> : <button 
                            onClick={() => {
                                setIsModifyinEtat(true)
                            }}
                            className="bg-white">Modifier</button>}
                        </div>
                        
                        <p className="text-xl pb-3 flex items-center">
                            <i className="fas fa-list mr-3"></i>Tout les élèves qui ne sont pas dans le cours
                        </p>

                        
                        <div className="bg-white overflow-auto">
                            <table className="min-w-full bg-white">
                                <thead className="bg-gray-800 text-white">
                                    <tr>
                                        <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                                        <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Last name</th>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Phone</th>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700">
                                    {
                                        eleves.map((item) => (
                                            <tr key={item.id}>
                                                <td className="w-1/3 text-left py-3 px-4">{item.prenom} </td>
                                                <td className="w-1/3 text-left py-3 px-4">{item.nom}</td>
                                                <td className="text-left py-3 px-4"><a className="hover:text-blue-500" href="tel:622322662">{item.tel}</a></td>
                                                <td className="text-left py-3 px-4"><a className="hover:text-blue-500" href="mailto:jonsmith@mail.com">{item.email}</a></td>
                                                <td className="text-left py-3 px-4">
                                                    <button className="hover:text-blue-500" onClick={() => {
                                                        handleSubmit(item.id,courId)
                                                    }}>Ajouter au cours</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div>
                        <div className="w-full overflow-x-hidden border-t flex flex-col">

                            <div className="w-full mt-12">
                                <p className="text-xl pb-3 flex items-center">
                                    <i className="fas fa-list mr-3"></i>Tout les élèves qui sont dans le cours
                                </p>
                            </div>
                            <div className="bg-white overflow-auto">

                                <table className="min-w-full bg-white">
                                    <thead className="bg-gray-800 text-white">
                                        <tr>
                                            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                                            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Last name</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Phone</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-700">
                                        
                                            {elevesDansCours.map((item) => {
                                                return(
                                                <tr key={item.id}>
                                                    <td className="w-1/3 text-left py-3 px-4">{item.prenom} </td>
                                                    <td className="w-1/3 text-left py-3 px-4">{item.nom}</td>
                                                    <td className="text-left py-3 px-4"><a className="hover:text-blue-500" href="tel:622322662">{item.tel}</a></td>
                                                    <td className="text-left py-3 px-4"><a className="hover:text-blue-500" href="mailto:jonsmith@mail.com">{item.email}</a></td>
                                                    <td className="text-left py-3 px-4">
                                                        <button className="hover:text-blue-500" onClick={() => handleOnRemoveFromCours(item.id)}>Retirer du cours</button>
                                                    </td>
                                                </tr>)
                                            })
                                        }
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>



            </div>

        </div >
    );
}
export default AddEleveToCours;

/*
{etatCours.map((etatValue,index) => {
                                    <option key={'etat'+index} value={etatValue}>{etatValue}</option>
                                })}
                                */