

import React, { useState, useEffect } from "react";
import { renderToString } from 'react-dom/server'
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
import 'tippy.js/dist/tippy.css';
import Tooltip from 'react-tooltip'
import Tippy, { tippy } from "@tippyjs/react";

//TODO HORAIRE à revoir + type de cours + quel prof + virer vue liste en eleve
const Calendar = ({ type }) => {

    const [data, setData] = useState();
    const [dataprofe, setDataprofe] = useState([])
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState();
    //const [eventRender, setEventRender] = useState();

    useEffect(() => {
        console.log(type)

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
            //TODO works for family logged ?
                axios
                    .get(process.env.REACT_APP_API_URL + '/eleves/' + Cookies.get('eleveId') + '/cours').then(
                        (response) => {
                            console.log(response)
                            if (response.data)
                                setEventsEffect(response.data.data)

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

    //TODO use membres in data 
    const setEventsEffect = (resData) => {
        if(type === 'eleve') {
            setData(resData);
            console.log(resData)
            setEvents(resData[0].coure.map((item, index) => (
                {
                    key: item.id,
                    title: item.titre,
                    start: item.debut_de_coure,
                    end: item.fin_de_coure,
                    backgroundColor: 'gray',
                }
            )))
        }
        if(type ==='admin') {
            setData(resData);
            console.log(resData)
            setEvents(resData.map((item, index) => (
                {
                    key: item.id,
                    title: item.titre,
                    description: <div> 
                    <h1>{item.titre}</h1>
                    {item.individuel ? <p>Individuel</p>: <p>Groupe</p>}
                    {<p className={item.etat === 2 ? "bg-blue-500 text-white" : item.etat ===1 ? "bg-red-500 text-white" : "bg-green-400 text-white" }>{TransformEtat(item.etat)}</p>}
                    {<p>Professeur {item.profe.nom + ' ' + item.profe.prenom}</p>}
                    {<p>Eleves: {item.membres.map(value => {
                        return <p>-{value.nom} {value.prenom} </p>
                    })}</p>}
                    <p>{(new Date(item.debut_de_coure) - new Date(item.fin_de_coure)).hour}</p>
                    </div>,
                    start: item.debut_de_coure,
                    end: item.fin_de_coure,
                    backgroundColor: 'gray',

                }
            )))
        }
    }

    

    const eventRender = (info) => {

        console.log(info.event.extendedProps.description)
        tippy(info.el, {
            placement: 'top',
            arrow: true,
            allowHTML: true,
            content: renderToString(info.event.extendedProps.description)
        }); 
        //arg.event.extendedProps.description
    }

    

    const calendarComp = () => {
        
        return <>
            <div className="w-full overflow-x-hidden border-t flex flex-col">
                <main className="w-full flex-grow p-6">
                    <button className="text-white bg-[#3788d8] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-3 justify-end"
                    ><Link to="/cours/">Vue Liste</Link></button>
                    <button className="text-white bg-[#3788d8] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-3 justify-end"
                    ><Link to="/admin/cours/add"><a>Ajouter un Cours</a></Link></button>
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
                            height={'100vh'}
                            events={events}
                            eventClick={handleEventClick}
                            eventDidMount={eventRender}
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







/*
<div> 
                    <h1>{item.titre}</h1>
                    {item.individuel ? <p>'Individuel'</p>: <p>'Groupe'</p>}
                    {<p className={item.etat === 2 ? "bg-blue-500 text-white" : item.etat ===0 ? "bg-red-500 text-white" : "bg-green-400 text-white" }>{TransformEtat(item.etat)}</p>}
                    {<p>Professeur {item.profe.nom + 'item.profe.prenom'}</p>}
                    {<p>Eleves: {item.membres.map(value => {
                        return <p>value.nom + ' ' + value.prenom </p>
                    })}</p>}
                    <p>{(new Date(item.debut_de_coure) - new Date(item.fin_de_coure)).hour}</p>
                    </div>
*/