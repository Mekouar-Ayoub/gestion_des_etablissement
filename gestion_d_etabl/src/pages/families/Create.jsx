import React, { useState } from "react";
import { AiOutlineMenu, AiFillCalendar, AiOutlineUser, AiOutlineInsertRowAbove } from "react-icons/ai";
import { Navigate } from "react-router-dom";
import Aside from "../../components/Aside"
import axios from "axios";
import Retour from "../../components/Retour";

function Create() {

    const [nom, setNom] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nom) {
            setErrorMessage('Please enter all fields');
            return;
        }

        try {
            
            const response = await axios.post(process.env.REACT_APP_API_URL+'/families', {
                nom,
            });

            setSuccessMessage('Data created successfully');
            window.location.href = '/admin/families/find/'+response.data;
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    return (
                <div className="w-full overflow-x-hidden border-t flex flex-col">
                    <Retour to='/admin/families' />
                    <main className="w-full flex-grow p-6">
                        <h1 className="text-3xl text-black pb-6">Dashboard</h1>
                        <div className="w-full mt-12">
                            <div className="bg-white overflow-auto">
                                <div>
                                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                                    {successMessage && <p className="text-green-500">{successMessage}</p>}
                                    <form className="max-w-xl ml-auto mr-auto border rounded p-4 my-6" onSubmit={handleSubmit}>
                                        <div className="mb-6">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom</label>
                                            <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} id="nom" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                        </div>
                                        <button type="submit" className="text-white bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ajouter</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
    );
}
export default Create;