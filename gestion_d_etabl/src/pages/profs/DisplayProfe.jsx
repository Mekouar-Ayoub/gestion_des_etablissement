import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiFillCalendar, AiOutlineUser, AiOutlineInsertRowAbove } from "react-icons/ai";
import Aside from "../../components/Aside"
import { Link } from "react-router-dom";
import axios from "axios";

function displayProfe() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isSlidOpen, setIsslidOpen] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/profs')
            .then(response => {
                const data = response.data
                setData(data);
            })
            .catch(error => {
                console.error(error)
            })
    })

    return (
       
                <div className="w-full overflow-x-hidden border-t flex flex-col">
                    <main className="w-full flex-grow p-6">
                        <h1 className="text-3xl text-black pb-6">Dashboard</h1>
                        <div className="w-full">
                            <div className="bg-white overflow-auto">
                                <div className='flex justify-end'>
                                    <button className="text-white bg-[#3788d8] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-3 justify-end"><Link to={'/admin/profs/add'}>Ajouter Un Professeur</Link></button>
                                </div>
                                <table className="min-w-full bg-white">
                                    <thead className="bg-[#3788d8] text-white">
                                        <tr>
                                            <th className="text-left py-3 px-2 uppercase font-semibold text-sm">Nom</th>
                                            <th className="text-left py-3 px-2 uppercase font-semibold text-sm">Prenom</th>
                                            <th className="text-left py-3 px-2 uppercase font-semibold text-sm">Téléphone</th>
                                            <th className="text-left py-3 px-2 uppercase font-semibold text-sm">Email</th>
                                            <th className="text-left py-3 px-2 uppercase font-semibold text-sm">Tarif horaire</th>
                                            <th className="text-left py-3 px-2 uppercase font-semibold text-sm">Solde initial</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-700">
                                        {
                                            data.map((item) => (
                                                <tr key={item.id}>
                                                    <td className="text-left py-3 px-2">{item.prenom}</td>
                                                    <td className="text-left py-3 px-2">{item.nom}</td>
                                                    <td className="text-left py-3 px-2"><a className="hover:text-blue-500" >{item.tel}</a></td>
                                                    <td className="text-left py-3 px-2"><a className="hover:text-blue-500" href="mailto:jonsmith@mail.com">{item.email}</a></td>
                                                    <td className="text-left py-3 px-2"><a className="hover:text-blue-500">{item.tarif}</a></td>
                                                    <td className="text-left py-3 px-2"><a className="hover:text-blue-500">{item.solde}</a></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </main>
                </div>
    );
}
export default displayProfe;