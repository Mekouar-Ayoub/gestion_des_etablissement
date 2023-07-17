import React, { useState, useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Aside from "../../components/Aside"
import axios from "axios";
import { useParams } from 'react-router-dom';
import { MdArrowCircleLeft } from "react-icons/md";
import { AiFillPlusSquare } from "react-icons/ai";


function AjouterMembre() {
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
  const [etudient] = useState(0);
  const [type, setType] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [members, setMember] = useState([]);

  const [data, setForm] = useState([
    {
      nom,
      prenom,
      tel,
      email,
      adresse,
      solde,
      famille_id,
      etudient,
      type,
    }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/showfamilles/${familleId}`);
        const members = response.data;
        setMember(members);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/AddMembre', data);
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
    setForm(temp);
  };

  const handleChecked = (index, value, selected) => {
    let temp = [...data];
    temp[index][selected] = value;
    setForm(temp);
  };

  const handleType = (index, value, selected) => {
    let temp = [...data];
    temp[index][selected] = value;
    setType(temp);
  };

  const handleNewRow = () => {
    setForm([...data, {
      nom,
      prenom,
      tel,
      email,
      adresse,
      solde,
      famille_id,
      etudient,
      type,
    }])
  }
  return (
    <div className="bg-gray-100 font-family-karla flex">
      <Aside />
      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <header className="w-full items-center bg-[#3d68ff] py-2 px-6 hidden sm:flex">
          <div className="w-1/2"></div>
          <div className="relative w-1/2 flex justify-end">
            <button onClick={() => setIsslidOpen(!isSlidOpen)} className="realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none">
              <img src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400" />
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
        <header className="w-full bg-sidebar py-5 px-6 sm:hidden">
          <div className="flex items-center justify-between">
            <a href="index.html" className="text-white text-3xl font-semibold uppercase hover:text-gray-300">Admin</a>
            <button className="text-white text-3xl focus:outline-none">
              <AiOutlineMenu onClick={() => setIsNavOpen(!isNavOpen)} />
            </button>
          </div>
          {isNavOpen && (<nav className="flex flex-col pt-4">
            <a href="index.html" className="flex items-center active-nav-link text-white py-2 pl-4 nav-item">
              <i className="fas fa-tachometer-alt mr-3"></i>
              Dashboard
            </a>
            <a href="blank.html" className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
              <i className="fas fa-sticky-note mr-3"></i>
              Blank Page
            </a>
            <a href="tables.html" className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
              <i className="fas fa-table mr-3"></i>
              Tables
            </a>
            <a href="forms.html" className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
              <i className="fas fa-align-left mr-3"></i>
              Forms
            </a>
            <a href="tabs.html" className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
              <i className="fas fa-tablet-alt mr-3"></i>
              Tabbed Content
            </a>
            <a href="calendar.html" className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
              <i className="fas fa-calendar mr-3"></i>
              Calendar
            </a>
            <a href="#" className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
              <i className="fas fa-cogs mr-3"></i>
              Support
            </a>
            <a href="#" className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
              <i className="fas fa-user mr-3"></i>
              My Account
            </a>
            <a href="#" className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
              <i className="fas fa-sign-out-alt mr-3"></i>
              Sign Out
            </a>
            <button className="w-full bg-white cta-btn font-semibold py-2 mt-3 rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
              <i className="fas fa-arrow-circle-up mr-3"></i> Upgrade to Pro!
            </button>
            < button className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center" >
              <i className="fas fa-plus mr-3"></i> New Report
            </button >
          </nav>
          )}
        </header >
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
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">solde</label>
                              <input type="text" value={details?.solde} onChange={(e) => handleCheck(index, e, "solde")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="mb-6">
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Etudiant</label>
                              <div className="flex space-x-4">
                                <label>
                                  <input
                                    type="checkbox"
                                    checked={details.etudient === 1}
                                    onChange={(e) => handleChecked(index, e.target.checked ? 1 : 0, "etudient")}
                                    className="mr-1"
                                  />
                                  Etudiant
                                </label>
                              </div>
                            </div>
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
      </div >
    </div>
  );
}
export default AjouterMembre;
