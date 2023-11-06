import React, { useState, useEffect } from "react";

import axios from "axios";
import { useParams } from 'react-router-dom';
import { MdArrowCircleLeft } from "react-icons/md";
import { AiFillPlusSquare } from "react-icons/ai";
import Retour from "../../components/Retour";
/*
family 
  nom,
      prenom,
      tel,
      email,
      adresse,
      solde,
      famille_id,
      isEleve,
      type,
*/

function AddMemberToFamily() {
  const [nom] = useState('');
  const [prenom] = useState('');
  const [tel] = useState('');
  const [email] = useState('');
  const [adresse] = useState('');
  const [solde] = useState('');
  const [profession, setProfession] = useState('');
  const [ecole, setEcole] = useState('');
  const { familyId } = useParams();
  const [isEleve,setEleve] = useState(0);
  const [type, setType] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [family, setFamily] = useState([]);

  const [data, setData] = useState([
    {
      
    }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/families/${familyId}`);
        const members = response.data;
        setFamily(members);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  },[familyId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      data.map(value => {
        console.log(value)
        value.famille_id=family.id
        if(!value.solde) {
          value.solde=-1
        }
        if(!value.isEleve) {
          value.isEleve=0
        }
      })
      console.log(data)
      const response = await axios.post(process.env.REACT_APP_API_URL+'/eleves', data);
      setSuccessMessage('Member added successfully');
      window.location.href = '/admin/families';
    } catch (error) {
      console.error(error)
      setErrorMessage('Error adding member: ' + error.message);
    }
  };

  const handleCheck = (index, e, selected) => {
    let temp = [...data]
    temp[index][selected] = e.target.value;
    setData(temp);
  };

  const handleChecked = (index, value, selected) => {
    let temp = [...data];
    temp[index][selected] = value;
    setData(temp);
  };

  const handleType = (index, value, selected) => {
    let temp = [...data];
    temp[index][selected] = value;
    setType(temp);
  };

  const handleNewRow = () => {
    setData([...data, {
      nom,
      prenom,
      tel,
      email,
      adresse,
      solde,
      ecole,
      profession,
      familleId: familyId,
      isEleve,
      type,
    }])
  }
  return (
    <div className="bg-gray-100 font-family-karla flex">
        <div className="w-full  border-t flex flex-col">
        <Retour to='admin/families'></Retour>
          <main className="w-full flex-grow p-6">
            
            <h1 className="text-3xl text-black pb-6">Ajouter des membres à la famille {family.nom} </h1>
            <div className="w-full ">
              <div className="bg-white">
                <div>
                  <MdArrowCircleLeft />
                  {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                  {successMessage && <p className="text-green-500">{successMessage}</p>}
                  <div className="max-w-xl ml-auto mr-auto border rounded p-4 my-3" >
                    {
                      data.map((details, index) => (
                        <>
                          <div key={index}>
                            <div className="mb-6">
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom</label>
                              <input type="text" value={details?.nom} onChange={(e) => handleCheck(index, e, "nom")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="mb-6">
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">prenom</label>
                              <input type="text" value={details?.prenom} onChange={(e) => handleCheck(index, e, "prenom")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="mb-6">
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">tel</label>
                              <input type="text" value={details?.tel} onChange={(e) => handleCheck(index, e, "tel")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="mb-6">
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">email</label>
                              <input type="text" value={details?.email} onChange={(e) => handleCheck(index, e, "email")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <p className="text-xs">Le mot de passe du membre est de type Nom.Prenom753!</p>
                            <div className="mb-6">
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">adresse</label>
                              <input type="text" value={details?.adresse} onChange={(e) => handleCheck(index, e, "adresse")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="mb-6">
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ecole</label>
                              <input type="text" value={details?.ecole} onChange={(e) => handleCheck(index, e, "ecole")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="mb-6">
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">profession</label>
                              <input type="text" value={details?.profession} onChange={(e) => handleCheck(index, e, "profession")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            
                            <div className="mb-6">
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Etudiant</label>
                              <div className="flex space-x-4">
                                <label>
                                  <input
                                    type="checkbox"
                                    checked={details.isEleve === 1}
                                    onChange={(e) => handleChecked(index, e.target.checked ? 1 : 0, "isEleve")}
                                    className="mr-1"
                                  />
                                  Etudiant
                                </label>
                              </div>
                            </div>
                            { 
                            data[index].isEleve !== 0 && data[index].isEleve !== undefined && <div className="mb-6">
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">solde</label>
                              <input type="text" value={details?.solde} onChange={(e) => handleCheck(index, e, "solde")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            }
                            <div className="mb-6">
                              <div className="mb-6">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
                                <div className="flex space-x-4">
                                  {(!family.length || !family.some(item => item.type === 'pere')) && (
                                    <label id="pere">
                                      <input
                                        type="checkbox"
                                        checked={details && details.type === 'pere'}
                                        onChange={(e) => handleType(index, e.target.checked ? 'pere' : null, "type")}
                                        className="mr-1"
                                      />
                                      Pere
                                    </label>
                                  )}
                                  {(!family.length || !family.some(item => item.type === 'mere')) && (
                                    <label id="mere">
                                      <input
                                        type="checkbox"
                                        checked={details && details.type === 'mere'}
                                        onChange={(e) => handleType(index, e.target.checked ? 'mere' : null, "type")}
                                        className="mr-1"
                                      />
                                      Mere
                                    </label>
                                  )}
                                  <label id="enfant">
                                    <input
                                      type="checkbox"
                                      checked={details.type === 'enfant'}
                                      onChange={(e) => handleType(index, e.target.checked ? 'enfant' : null, "type")}
                                      className="mr-1"
                                    />
                                    enfant
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ))
                    }
                    <div className="flex justify-between">
                      <button onClick={handleNewRow} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><AiFillPlusSquare /></button>
                      
                    </div>
                    <div className="text-center">
                    <button onClick={handleSubmit} className="text-white bg-green-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sauvegarder</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
    </div>
  );
}
export default AddMemberToFamily;
