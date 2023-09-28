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
    const etudient = {
        membre_id,
        coure_id
    }

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/ShowMembre')
            .then(response => {
                const data = response.data.data;
                setData(data);
            })
            .catch(error => {
                console.log(error);
            })
    })
    const hendelsubmit = () => {
        console.log(etudient)
        axios
            .post('http://localhost:8000/api/AddToCoure', etudient)
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
                                <div className=" w-full">
                                    <input className=" w-[87%] rounded my-3" type="text" value={membre_id} onChange={(e) => setMembre_id(e.target.value)} readOnly={true} hidden={true} />
                                    <input className=" w-[87%] rounded my-3" type="text" value={nom} />
                                    <button onClick={hendelsubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to Course</button>
                                    {successMessage}
                                </div>
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