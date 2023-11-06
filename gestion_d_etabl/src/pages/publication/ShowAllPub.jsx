import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineMenu } from "react-icons/ai";
import Aside from "../../components/Aside"
import { Link } from "react-router-dom";

function Dashoard() {
    const [data, setData] = useState([]);

    //TODO make navigation
    useEffect(() => {
        axios
            .get(process.env.REACT_APP_API_URL+'/publications')
            .then(response => {
                const data = response.data;
                setData(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div className="bg-gray-100 font-family-karla flex">
            
                <div className="w-full overflow-x-hidden border-t flex flex-col">
                    <main className="w-full flex-grow p-6">
                        <h1 className="text-3xl text-black pb-6">Toutes les publications</h1>
                        <div className="w-full">
                            <div className="bg-white overflow-auto">
                                <div className='flex justify-end'>
                                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-3 justify-end"><Link to={'/admin/publications/addpublication'}>Ajouter Une publication</Link></button>
                                </div>
                                <table className="min-w-full bg-white">
                                    <thead className="bg-[#3788d8] text-white">
                                        <tr>
                                            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">image</th>
                                            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">vidéo</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Description</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-700">
                                        {
                                            data.map((item ) => (
                                                <tr key={item.id}>
                                                    <td className="w-1/3 text-left py-3 px-4">{item.image}</td>
                                                    <td className="w-1/3 text-left py-3 px-4">{item.vedeo}</td>
                                                    <td className="text-left py-3 px-4"><p className=" h-20" name="" id="" cols="30" rows="10">{item.description}</p></td>
                                                    <td className="w-1/3 text-left py-3 px-4 flex">
                                                    <a href={'/admin/publications/'+ item.id+'/modify'}><img src="/images/ModifyIcon.svg"></img></a>    
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </main>
                </div>
            </div >
    );
}
export default Dashoard;