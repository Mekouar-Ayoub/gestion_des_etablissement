import React, { useEffect, useState } from "react";
import Aside from "../../components/Aside"
import { Select } from "@mui/material";
import axios from "axios";
import { MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
function Events() {

    const navegate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [priority, setPriority] = useState('');
    const [events, setEvents] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
 
    useEffect(() => {
        //TODO getAll events 

        axios.get('http://localhost:8000/api/getallevent').then(response => {
            console.log(response.data)
            setEvents(response.data)
        }
        ).catch(e => console.log(e))

    }, [])

    const handlePriorityChange = (event) => {
            setPriority(event.target.value)
        }
    const handleSubmit = async (e) => {

        e.preventDefault();


        if (!title || !description || !date || !priority) {
            alert('Please enter all fields');

            return;
        }
        try {
            const response = await axios.post('http://localhost:8000/api/ajouterEvent', {
                title: title,
                description: description,
                date: date,
                priority: priority
            });



            console.log(response.data);
        } catch (error) {
            console.error(error);
        }

    }

    return (

        <div className="w-full overflow-x-hidden border-t flex flex-col">
            <main className="w-full flex-grow p-6">
                <h1 className="text-3xl text-black pb-6">Taches</h1>
                {isAdding ?

                    <form className="max-w-xl ml-auto mr-auto border rounded p-4 my-6" onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom de l'evement </label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} id="nom" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            <Select
                                required
                                fullWidth
                                id="events_id"
                                label="Priorité"
                                value={priority}
                                onChange={handlePriorityChange}
                            >

                                <MenuItem key={1} value={1}>
                                    Très Urgent
                                </MenuItem>
                                <MenuItem key={1} value={1}>
                                    Mieux vaut ne pas procrastiner
                                </MenuItem>
                                <MenuItem key={1} value={1}>
                                    Quand j&apos;aurais le temps c&apos;est cool
                                </MenuItem>
                            </Select>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description détaillée de l'évenement</label>
                            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} id="nom" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date prévue pour l'accomplissement de la tache</label>
                            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} id="nom" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />

                        </div>
                        <button type="submit" className="text-white bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form> : <div className="w-full">
                        <button onClick={() => {
                            isAdding
                        }} >Ajouter une Nouvelle Tache</button>
                        <ul>
                            {events.map(
                                value => {
                                    return <li key={value.id}>
                                        <h2>{value.title}</h2>
                                        <p>{value.description}</p>
                                        {value.date}
                                        <span className={value.priority === 1 ? 'text-red-700'
                                            : value.priority === 2 ? 'text-orange-500' : 'text-green-300'}
                                        >{value.priority === 1 ? 'Très Urgent'
                                            : value.priority === 2 ? 'Mieux vaut ne pas procrastiner' : "Quand j'aurais le temps c'est cool"}</span>
                                    </li>
                                }
                            )}
                        </ul>

                    </div>

                }

            </main>
        </div>
    );
}
export default Events;

