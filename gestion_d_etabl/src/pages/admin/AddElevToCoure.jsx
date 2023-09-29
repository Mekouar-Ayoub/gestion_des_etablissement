import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { AiOutlineMenu} from "react-icons/ai";
import Aside from "../../components/Aside";

function AddEleveToCours() {

    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isSlidOpen, setIsslidOpen] = useState(false);
    const { coureId } = useParams();
    const [data, setData] = useState([]);
    const [membre_id, setMembre_id] = useState();
    const [coure_id] = useState(coureId);
    const [successMessage, setSuccessMessage] = useState();
    const [nom, setNom] = useState()
    const [cours, setCours] = useState();
    const params = useParams();
    const etudient = {
        membre_id,
        coure_id
    }

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/eleves')
            .then(response => {
                const data = response.data;
                setData(data);
                


                axios
                .get('http://localhost:8000/api/cours/'+ params.coureId)
                .then(response => {
                    const resData = response.data;
                    
                    setCours(resData);
                    const memberIds = []
                    resData.map(value=> memberIds.push(value.membre_id))
                    const newData = data.filter((value)=> {
                        console.log(value.id)
                        return memberIds.includes(value.id)
                    })
                    
                    setData(newData)
    
                })
                .catch(error => {
                    console.log(error);
                })
            })
            .catch(error => {
                console.log(error);
            })

            
    },[])

    const handleSubmit = () => {
        //console.log(etudient)
        axios.post('http://localhost:8000/api/cours/'+params.coureId+'/eleves', etudient)
            .then((response) => {
                setSuccessMessage('the etudient added to coure')
            })
            .catch((error) => {
                console.log(error);
            })
    }
    function hendelidmum(valeur, valeur2) {
        setMembre_id(valeur);
        setNom(valeur2)
    }

    return (
        <div className="bg-gray-100 font-family-karla flex">
                <div className="w-full overflow-x-hidden border-t flex flex-col">
                    <main className="w-full flex-grow p-6">
                        <div className="w-full mt-12">
                            <p className="text-xl pb-3 flex items-center">
                                <i className="fas fa-list mr-3"></i>Tout les élèves
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
                                            data.map((item) => (
                                                item.etudient === 1 &&
                                                <tr key={item.id}>
                                                    <td className="w-1/3 text-left py-3 px-4">{item.prenom} </td>
                                                    <td className="w-1/3 text-left py-3 px-4">{item.nom}</td>
                                                    <td className="text-left py-3 px-4"><a className="hover:text-blue-500" href="tel:622322662">{item.tel}</a></td>
                                                    <td className="text-left py-3 px-4"><a className="hover:text-blue-500" href="mailto:jonsmith@mail.com">{item.email}</a></td>
                                                    <td className="text-left py-3 px-4">
                                                        <button className="hover:text-blue-500" onClick={() => hendelidmum(item.id, item.nom)}>addtocoure</button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </main>

                    <footer className="w-full bg-white text-right p-4">
                        Built by <a target="_blank" href="https://davidgrzyb.com" className="underline">David Grzyb</a>.
                    </footer>
                </div>

            </div >
    );
}
export default AddEleveToCours;