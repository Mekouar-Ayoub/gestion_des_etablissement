

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
import { TransformEtat } from "../../utils/common-objects"
import Cookies from "js-cookie";


const Calendar = ({ type }) => {

    const [data, setData] = useState();
    const [dataprofe, setDataprofe] = useState([])
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState();

    const setEventsEffect = (resData) => {
        setData(resData);
        setEvents(resData.map((item, index) => (
            {
                key: item.id,
                title: '' + item.titre,
                start: item.debut_de_coure,
                end: item.fin_de_coure,
                backgroundColor: 'gray',
                extendedProps: {
                    etat: '' + ', etat :' + TransformEtat(item.etat)
                }
            }
        )))
    }
    useEffect(() => {

        if (!data) {
            if (type === 'admin') {
                axios
                    .get(process.env.REACT_APP_API_URL + '/cours')
                    .then((response) => {
                        const data = response.data.data;
                        console.log(data)
                        if (data)
                            setEventsEffect(data)

                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
            if (type === 'eleve')
                axios
                    .get(process.env.REACT_APP_API_URL + '/eleves/' + Cookies.get('eleveId') + '/cours').then(
                        (response) => {
                            console.log(response)
                            if (response.data)
                                setEventsEffect(response.data)

                        }
                    )

            if (type === 'prof') {
                axios
                    .get(process.env.REACT_APP_API_URL + '/profs/')
                    .then((response) => {
                        const profs = response.data;
                        if (profs)
                            setDataprofe(profs);
                        console.log(profs)
                    })
                    .catch(error => {
                        console.error(error);
                    });

                axios
                    .get(process.env.REACT_APP_API_URL + '/profs/' + Cookies.get('profId') + '/cours').then(
                        (response) => {
                            console.log(response)
                            if (response.data)
                                setEventsEffect(response.data)
                        }
                    )
            }
        }




    }, [data]);

    const calendarComp = () => {
        return <>
            <div className="w-full overflow-x-hidden border-t flex flex-col">
                <main className="w-full flex-grow p-6">
                    <button className="text-white bg-[#3788d8] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-3 justify-end"
                    ><Link to="/cours/">Vue Liste</Link></button>
                    <button className="text-white bg-[#3788d8] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-3 justify-end"
                    ><Link to="admin/cours/add">Ajouter un Cours</Link></button>
                    <div>
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
                                daysOfWeek: [1, 2, 3, 4, 5,6,7],
                                startTime: '08:00',
                                endTime: '23:00',
                            }}
                            slotLabelFormat={{
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false
                            }}
                            hiddenDays={[]}
                            slotMinTime="08:00:00"
                            slotMaxTime="23:00:00"
                            height={'80vh'}
                            events={events}
                            eventClick={handleEventClick}

                        />
                    </div>
                </main>
            </div>
        </>
    }

    const handleEventClick = (eventClickInfo) => {

        const clickedEvent = eventClickInfo.event;
        console.log(clickedEvent)
        setSelectedEvent(clickedEvent);
        window.location.href = '/admin/cours/' + clickedEvent._def.extendedProps.key
        //setShow(true);
    };

    return (<>
        {!data ? <h1> Vous n'avez pas de cours</h1> : calendarComp()}
    </>


    )
}
export default Calendar;






