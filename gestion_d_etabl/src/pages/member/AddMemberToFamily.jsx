import React, { useState, useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Aside from "../../components/Aside"
import axios from "axios";
import { useParams } from 'react-router-dom';
import { MdArrowCircleLeft } from "react-icons/md";
import { AiFillPlusSquare } from "react-icons/ai";
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
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSlidOpen, setIsslidOpen] = useState(false)
  const [nom] = useState('');
  const [prenom] = useState('');
  const [tel] = useState('');
  const [email] = useState('');
  const [adresse] = useState('');
  const [solde] = useState('');
  const { familleId } = useParams();
  const [famille_id] = useState(familleId);
  const [isEleve,setEleve] = useState(0);
  const [type, setType] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [members, setMember] = useState([]);

  const [data, setData] = useState([
    {
      
    }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/familles/${familleId}`);
        const members = response.data;
        setMember(members);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/eleves', data);
      setSuccessMessage('Member added successfully');
      window.location.href = '/member/ShowAllmember';
      console.log('Member added successfully')
    } catch (error) {
      console.error(error);
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
      famille_id,
      isEleve,
      type,
    }])
  }
  return (
    <div className="bg-gray-100 font-family-karla flex">
        <div className="w-full overflow-x-hidden border-t flex flex-col">
          <main className="w-full flex-grow p-6">
            <h1 className="text-3xl text-black pb-6">ajouter des membres</h1>
            <div className="w-full ">
              <div className="bg-white overflow-auto">
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
                            <div className="mb-6">
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">adresse</label>
                              <input type="text" value={details?.adresse} onChange={(e) => handleCheck(index, e, "adresse")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
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
                            { //TODO not working
                            data[index].isEleve !== 0 && data[index].isEleve !== undefined && <div className="mb-6">
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">solde</label>
                              <input type="text" value={details?.solde} onChange={(e) => handleCheck(index, e, "solde")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            }
                            <div className="mb-6">
                              <div className="mb-6">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
                                <div className="flex space-x-4">
                                  {(!members.length || !members.some(item => item.type === 'pere')) && (
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
                                  {(!members.length || !members.some(item => item.type === 'mere')) && (
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
                      <button onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">ajouter</button>
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
