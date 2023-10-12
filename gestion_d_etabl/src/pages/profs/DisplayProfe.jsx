import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiFillCalendar, AiOutlineUser, AiOutlineInsertRowAbove } from "react-icons/ai";
import Aside from "../../components/Aside"
import { Link } from "react-router-dom";
import axios from "axios";

function displayProfe() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isSlidOpen, setIsslidOpen] = useState(false);
    const [data, setData] = useState([]);
    const [isPaying, setIsPaying] = useState(false);
    const [prixAPayer, setPrixApayer] = useState(0);
    const [profId, setProfId] = useState();
    useEffect(() => {
        axios
            .get(process.env.REACT_APP_API_URL+'/profs')
            .then(response => {
                const data = response.data
                setData(data);
            })
            .catch(error => {
                console.error(error)
            })
    },[])

    const handleOnClickPay=(id)=>{
        setIsPaying(true)
        setProfId(id)
    }

    const onSaveClick = ()=> {
        console.log(prixAPayer)
        console.log(profId)
        let confirmed = confirm('Le prix est de :'+ prixAPayer +' etes vous sur ? ')
        
        if(confirmed) {
            axios.put(process.env.REACT_APP_API_URL+'/profs/'+profId+'/solde', {solde: prixAPayer})
            .then(response=> {
                console.log(response)
            })
            .catch(e=> {
                console.error(e)
            });
            //window.location.href='/admin/profs'  
        }
        setIsPaying(false);
    }
//todo enregistrer non working back
    return (

        <div className="w-full overflow-x-hidden border-t flex flex-col">
            <main className="w-full flex-grow p-6">
                <h1 className="text-3xl text-black pb-6">Dashboard</h1>
                <div className="w-full">
                    <div className="bg-white overflow-auto">
                        <div className='flex justify-end'>
                            <button className="text-white bg-[#3788d8] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-3 justify-end">
                                <Link to={'/admin/profs/add'}>
                                <a>Ajouter Un Professeur</a>
                                </Link>
                                    </button>
                        </div>
                        {isPaying && <>
                        <label>Montant payé au professeur</label>
                        <input onChange={(e)=>{
                            setPrixApayer(e.target.value)
                        }} />
                        <button onClick={onSaveClick}>Enregister</button>
                        </>}
                        <table className="min-w-full bg-white">
                            <thead className="bg-[#3788d8] text-white">
                                <tr>
                                    <th className="text-left py-3 px-2 uppercase font-semibold text-sm">Nom</th>
                                    <th className="text-left py-3 px-2 uppercase font-semibold text-sm">Prenom</th>
                                    <th className="text-left py-3 px-2 uppercase font-semibold text-sm">Téléphone</th>
                                    <th className="text-left py-3 px-2 uppercase font-semibold text-sm">Email</th>
                                    <th className="text-left py-3 px-2 uppercase font-semibold text-sm">Tarif horaire</th>
                                    <th className="text-left py-3 px-2 uppercase font-semibold text-sm">Solde actuel à rendre</th>
                                    <th className="text-left py-3 px-2 uppercase font-semibold text-sm">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {
                                    
                                    data.map((item, index) => (
                                        <tr key={item.id}>
                                            <td className="text-left py-3 px-2">{item.prenom}</td>
                                            <td className="text-left py-3 px-2">{item.nom}</td>
                                            <td className="text-left py-3 px-2"><a className="hover:text-blue-500" >{item.tel}</a></td>
                                            <td className="text-left py-3 px-2"><a className="hover:text-blue-500" href="mailto:jonsmith@mail.com">{item.email}</a></td>
                                            <td className="text-left py-3 px-2"><a className="hover:text-blue-500">{item.tarif}</a></td>
                                            <td className="text-left py-3 px-2"><a className="hover:text-blue-500">{item.solde}</a></td>
                                            <td className="text-left py-3 px-2 flex justify-between">
                                                <a className="hover:text-blue-500 mt-3" href={"/admin/profs/" + item.id + "/modify"}>
                                                <img src="/ModifyIcon.svg"/>
                                            </a>
                                            <a className="hover:text-blue-500 mt-3" href={"/admin/profs/" + item.id}>
                                                <img src="/Details.svg"/>
                                            </a>
                                            
                                            <button className="bg-green-400 p-3 text-white" onClick={() => handleOnClickPay(item.id)}>Payer</button>
                                            
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
    );
}
export default displayProfe;