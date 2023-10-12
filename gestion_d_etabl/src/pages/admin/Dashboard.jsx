import React, { useState ,useEffect} from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Aside from "../../components/Aside"
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

function Dashoard() {
    //TODO gerer ajout des soldes durant les ajouts de prof et eleve
    const [historyEcole, setHistoryEcole] = useState([]);
    const [historyProfs, setHistoryProfs] = useState([]);
    const [historyEleves, setHistoryEleves] = useState([]);

    const [solde, setSolde] = useState();
    useEffect(()=> {

    axios.get(process.env.REACT_APP_API_URL+'/admin/ecole/solde')
    .then(response => {
                
        setHistoryEcole(response.data.data);
        console.log(response)
        setSolde(response.data.data[response.data.data.length-1].solde)

        })
    .catch(error => {
        console.error(error);
    })
    axios.get(process.env.REACT_APP_API_URL+'/solde/eleves')
    .then(response => {
        setHistoryEleves(response.data);
       
        console.log(response)
    })
    .catch(error => {
        console.error(error);
    })

    axios.get(process.env.REACT_APP_API_URL+'/solde/profs')
    .then(response => {

        setHistoryProfs(response.data);
       
        console.log(response.data)
    })
    .catch(error => {
        console.error(error);
    })

},[])
    return (<>
            <div className="w-full flex-col h-screen">
            
                <div className="w-full overflow-x-hidden border-t flex flex-col">
                    <main className="w-full flex-grow p-6">
                        <h1 className="text-3xl text-black pb-6">Dashboard</h1>
                        <div className="w-full">

                            <div className="bg-white overflow-auto flex justify-evenly items-center">
                                <div className=" border rounded px-[100px] py-[40px]">
                                <h1>Historique ecole</h1> 
                                <h2>Solde Actuel :{solde}</h2>
                                <table className="min-w-full bg-white">
                                    <thead className="bg-[#3788d8] text-white">
                                        <tr>
                                            <th className=" text-left py-3 px-4 uppercase font-semibold text-sm">Mouvement</th>
                                            <th className=" text-left py-3 px-4 uppercase font-semibold text-sm">Solde à ce moment</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Cours associé</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Prof associé</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Eleve Associé</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Type de paiement</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Type de mouvement</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Profit du mouvement</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Date et heure du mouvement</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                                        </tr>
                                    </thead>
                                    {historyEcole && <tbody className="text-gray-700">
                                        {
                                            historyEcole.map((item) => (
                                                <tr key={item.id}>
                                                    <td className=" text-left py-3 px-4">{item.mouvement}</td>
                                                    <td className=" text-left py-3 px-4">{item.solde}</td>
                                                    <td className=" text-left py-3 px-4">{item.cour && item.cour.titre}</td>
                                                    <td className=" text-left py-3 px-4">{item.prof && ""+ item.prof.nom + " " +item.prof.prenom}</td>
                                                    <td className=" text-left py-3 px-4">{item.eleve && ""+ item.eleve.nom + " " +item.eleve.prenom}</td>
                                                    <td className=" text-left py-3 px-4">{item.type_de_paiement}</td>
                                                    <td className=" text-left py-3 px-4">{item.type}</td>
                                                    <td className=" text-left py-3 px-4">{item.profit}</td>
                                                    <td className=" text-left py-3 px-4">{new Date(item.created_at).toUTCString()}</td>
                                                    
                                                    <td className="text-left py-3 px-4 flex">
                                                       
                                                        <a className="hover:text-blue-500" href={""} >
                                                        <img src="/Details.svg" />
                                                        </a>
                                                        
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>}
                                </table>
                                </div>
                                
                            </div>
                        </div>
                    </main>
                </div>
                <div className=" border rounded px-[100px] py-[40px]">
                <table className="min-w-full bg-white">
                                    <thead className="bg-[#3788d8] text-white">
                                        <tr>
                                            <th className=" text-left py-3 px-4 uppercase font-semibold text-sm">Eleve</th>
                                            <th className=" text-left py-3 px-4 uppercase font-semibold text-sm">Cours asscoié</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Nombre d'heures du cours</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Prix à payer par l'eleve</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Type de paiement</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Type de mouvement</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Date et heure du mouvement</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                                        </tr>
                                    </thead>
                                    {historyEleves.length >0 && <tbody className="text-gray-700">
                                        {
                                            historyEleves.map((item) => (
                                                <tr key={item.id}>
                                                    <td className=" text-left py-3 px-4">{item.eleve && ""+ item.eleve.nom + " " +item.eleve.prenom}</td>
                                                    <td className=" text-left py-3 px-4">{item.cour && item.cour.titre}</td>
                                                    <td className=" text-left py-3 px-4">{item.nombre_heures}</td>
                                                    <td className=" text-left py-3 px-4">{item.prix}</td>
                                                    <td className=" text-left py-3 px-4">{item.type_de_paiement}</td>
                                                    <td className=" text-left py-3 px-4">{item.type}</td>
                                                    
                                                    <td className=" text-left py-3 px-4">{new Date(item.created_at).toUTCString()}</td>
                                                    
                                                    <td className="text-left py-3 px-4 flex">
                                                       
                                                        <a className="hover:text-blue-500" href={""} >
                                                        <img src="/Details.svg" />
                                                        </a>
                                                        
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>}
                                </table>
                </div>
                <div className=" border rounded px-[100px] py-[40px]">
                <table className="min-w-full bg-white min-h-[500hv]">
                                    <thead className="bg-[#3788d8] text-white">
                                        <tr>
                                            <th className=" text-left py-3 px-4 uppercase font-semibold text-sm">Prof</th>
                                            <th className=" text-left py-3 px-4 uppercase font-semibold text-sm">Cours asscoié</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Nombre d'heures du cours</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Prix à rendre</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Type de paiement</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Type de mouvement</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Profit du mouvement</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Date et heure du mouvement</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                                        </tr>
                                    </thead>
                                    {historyProfs.length >0 && 
                                    <tbody className="text-gray-700">
                                        {
                                            historyProfs.map((item) => (
                                                <tr key={item.id}>
                                                    <td className=" text-left py-3 px-4">{item.prof && ""+ item.prof.nom + " " +item.prof.prenom}</td>
                                                    <td className=" text-left py-3 px-4">{item.cour && item.cour.titre}</td>
                                                    <td className=" text-left py-3 px-4">{item.nombre_heures}</td>
                                                    <td className=" text-left py-3 px-4">{item.prix_a_rendre}</td>
                                                    <td className=" text-left py-3 px-4">{item.type_de_paiement}</td>
                                                    <td className=" text-left py-3 px-4">{item.type}</td>
                                                    <td className=" text-left py-3 px-4">{item.profit}</td>
                                                    <td className=" text-left py-3 px-4">{new Date(item.created_at).toUTCString()}</td>
                                                    
                                                    <td className="text-left py-3 px-4 flex">
                                                       
                                                        <a className="hover:text-blue-500" href={""} >
                                                        <img src="/Details.svg" />
                                                        </a>
                                                        
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>}
                                </table>

                </div>
            </div >
        
        </>);
}
export default Dashoard;