import React, { useState, useEffect } from "react";
import { AiFillCalendar, AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import Fullcalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { format } from 'date-fns';
import Aside from "../../components/Aside";


const Calendar = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isSlidOpen, setIsSlidOpen] = useState(false);
    const [data, setData] = useState([]);
    const [dataprofe, setDataprofe] = useState([])
    const [show, setShow] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState(null);
    useEffect(() => {
        axios
            .get('http://localhost:8000/api/toutlascoure')
            .then(response => {
                const data = response.data.data;
                setData(data);
                console.log(data)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    useEffect(() => {
        axios
            .post(`http://localhost:8000/api/findProfe/${sessionStorage.token}`)
            .then(response => {
                const profe = response.data;
                setDataprofe(profe);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleEventClick = (eventClickInfo) => {
        const clickedEvent = eventClickInfo.event;
        setSelectedEvent(clickedEvent);
        setShow(true);
    };
    const profe = dataprofe.map((item) => item);
    function Sayhello() {
        const [titre] = useState(selectedEvent.title)
        const [debut_de_coure] = useState(format(new Date(selectedEvent.start), "yyyy-MM-dd HH:mm:ss"));
        const [fin_de_coure] = useState(format(new Date(selectedEvent.end), "yyyy-MM-dd HH:mm:ss"));
        const [profe_id] = useState(sessionStorage.token);
        const [prix_horaire] = useState(profe[0].tarif)
        const [etat] = useState('coure dont have tetcher')
        const [successMessage, setSuccessMessage] = useState('');
        const [errorMessage, setErrorMessage] = useState('');

        const hundeSubmit = async () => {
            try {
                const response = await axios.post(
                    'http://localhost:8000/api/AjouterCoure',
                    {
                        titre,
                        prix_horaire,
                        etat,
                        debut_de_coure,
                        fin_de_coure,
                        profe_id,
                    }
                );
                setSuccessMessage('Event added successfully');
                setErrorMessage('');

            } catch (error) {
                console.error(error);
                setErrorMessage('Error adding event: ' + error.message);
                setSuccessMessage('');
            }
        }
        return (
            <div className="bg-gray-100 font-family-karla flex">
            <Aside />
            <div className="w-full flex flex-col h-screen overflow-y-hidden">
                <header className="w-full items-center bg-[#3d68ff] py-2 px-6 hidden sm:flex">
                    <div className="w-1/2"></div>
                    <div className="relative w-1/2 flex justify-end">
                        <button onClick={() => setIsSlidOpen(!isSlidOpen)} className="realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none">
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
            <div>
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Modal Title
                                    </h3>
                                </div>
                                <div className="relative p-6 flex-auto">
                                </div>
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShow(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={hundeSubmit}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            </div>
            </div>
            </div>
        )
    }
    const events = data.map((item, index) => (
        {
            key: index,
            title: item.titre,
            start: item.debut_de_coure,
            end: item.fin_de_coure,
            backgroundColor: 'gray'
        }
    ));
    return (
        
                
                <div className="w-full overflow-x-hidden border-t flex flex-col">
                    <main className="w-full flex-grow p-6">
                    <button className="text-white bg-[#3788d8] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-3 justify-end"
                        ><Link to="/cours/Index">Vue Liste</Link></button>
                        <button className="text-white bg-[#3788d8] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-3 justify-end"
                        ><Link to="cours/AjouterCoure">Ajouter un Cours</Link></button>
                        <div>
                            {
                                show ? (
                                    <Sayhello />
                                ) : null
                            }
                            <Fullcalendar
                                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                initialView={"dayGridMonth"}
                                allDaySlot={false}
                                headerToolbar={{
                                    start: "today prev next",
                                    center: "title",
                                    end: "dayGridMonth,timeGridWeek,timeGridDay"
                                }}
                                businessHours={{
                                    daysOfWeek: [1, 2, 3, 4, 5],
                                    startTime: '10:00',
                                    endTime: '18:00',
                                }}
                                slotLabelFormat={{
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false
                                }}
                                hiddenDays={[0, 6]}
                                slotMinTime="09:00:00"
                                slotMaxTime="17:00:00"
                                height={'80vh'}
                                events={events}
                                eventClick={handleEventClick}

                            />
                        </div>
                    </main>
                </div>
    
    );
}
export default Calendar;