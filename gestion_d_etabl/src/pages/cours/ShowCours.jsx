import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiFillCalendar, AiOutlineUser, AiOutlineInsertRowAbove } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import Aside from "../../components/Aside";
import {TransformEtat} from "../../utils/common-objects"

function index({user}) {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isSlidOpen, setIsslidOpen] = useState(false)
    const [data, setData] = useState([]);
    const [nomPrenoms,setNomPrenoms]= useState([]);
    useEffect(() => {
        axios
            .get(process.env.REACT_APP_API_URL+'/cours')
            .then(response => {
                console.log(response.data)
                setData(response.data.data)
        })

            
    },[])

    //TODO add cours ajouter nom prof pas que prenom
    return (
        <>
            <div className="w-full overflow-x-hidden border-t flex flex-col">
                <main className="w-full flex-grow p-6">
                    <h1 className="text-3xl text-black pb-6">Liste des cours</h1>
                    <button className="text-white bg-[#3788d8] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-3 justify-end"
                    ><Link to="/calendar">Vue Calendrier</Link></button>
                    <button className="text-white bg-[#3788d8] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-3 justify-end">
                        {user === 'admin' ? <Link to={'/admin/cours/add'}>Ajouter un cours</Link> : <></>}
                    </button>

                    <div className="w-full">
                        <div className="bg-white overflow-auto w-full">
                            <div className='flex justify-end'>

                            </div>
                            <table className="w-full bg-white">
                                <thead className="">
                                    <tr className="w-full">
                                        <th className="text-left py-3 uppercase font-semibold text-sm">Type de cours</th>
                                        <th className="text-left py-3 uppercase font-semibold text-sm">Prix horaire du cours</th>
                                        <th className="text-left py-3 uppercase font-semibold text-sm">Etat du cours</th>
                                        <th className="text-left py-3 uppercase font-semibold text-sm">Debut du cours</th>
                                        <th className="text-left py-3 uppercase font-semibold text-sm">Fin du cours</th>
                                        <th className="text-left py-3 uppercase font-semibold text-sm">Professeur</th>
                                        <th className="text-left py-3 uppercase font-semibold text-sm">Eleves</th>
                                        <th className="text-left py-3 uppercase font-semibold text-sm">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700">
                                    {
                                        data.map((item, index) => (
                                            <tr key={index}>
                                                <td className="text-left py-3">{item.titre}</td>
                                                <td className="text-left py-3">{item.prix_horaire}</td>
                                                <td className="text-left py-3"><a className="hover:text-blue-500" href="tel:622322662">{TransformEtat(item.etat)}</a></td>
                                                <td className="text-left py-3"><a className="hover:text-blue-500">{item.debut_de_coure}</a></td>
                                                <td className="text-left py-3"><a className="hover:text-blue-500">{item.fin_de_coure}</a></td>
                                                <td className="text-left py-3"><a className="hover:text-blue-500"></a>{item.profe.nom}</td>
                                                <td className="text-left py-3"><a className="hover:text-blue-500"></a>{item.membres.map((value) => {
                                                    return value.nom + ' ' + value.prenom + ' ,'
                                                })}</td>
                                                <td className="text-left py-3 flex"><a className="hover:text-blue-500"><Link to={`/admin/cours/${item.id}`}>
                                                    <img src="/AddMember.svg" />
                                                    </Link></a>
                                                <a className="hover:text-blue-500"><Link to={`/admin/cours/${item.id}`}>
                                                    <img src='/ModifyIcon.svg' />
                                                    </Link></a>
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



        </>
    )
}

export default index;


/*

const data = response.data.data;    
                data.map((value,index)=> {
                    axios
                    .get(process.env.REACT_APP_API_URL+'/cours/'+value.id)
                    .then(response1 => {
                        
                        console.log(response1.data)
                            if(response1.data.length >0 ){
                                response1.data.map((value) => {
                                    axios.get(process.env.REACT_APP_API_URL+'/eleves/'+response1.data.membre_id)
                                    .then(response2=> {
                                        console.log(response2.data)
                                        newElevesCoursArray.push({
                                            coursId : value.id,
                                            eleves: response2.data
                                        })
                                })
                                
                            }

                            else{
                                axios.get(process.env.REACT_APP_API_URL+'/eleves/'+response1.data.membre_id)
                                .then(response2=> {
                                    console.log(response2.data)
                                    newElevesCoursArray.push({
                                        coursId : value.id,
                                        eleves: response2.data
                                    })
                            }
                            
                                
                    setCoursWithEleves(newElevesCoursArray)
                            }
                            
                            )
                        }
                        
                    )
                })

                */