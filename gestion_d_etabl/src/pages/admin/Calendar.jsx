

import React, { useState, useEffect, useRef } from "react";
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
import { Audio } from "react-loader-spinner";
import { isPlatform } from "@ionic/react";

//TODO HORAIRE à revoir + type de cours + quel prof + virer vue liste en eleve
const Calendar = ({ type }) => {

    const [endString, setEndString] = useState("");
    const [centerString, setCenterString] = useState("");
    const [data, setData] = useState();
    const [dataprofe, setDataprofe] = useState([])
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState({});
    const [pagination, setPagination] = useState();
    const [isLoading, setisLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(!isPlatform('desktop'));
    const calendarRef = useRef();
    const [once, setOnce] = useState(false);
    //const [eventRender, setEventRender] = useState();


    //TODO améliorer header tool bar Mettre prof du cours et eleves du cours
    useEffect(() => {
        if(isMobile)
        {
            setEndString("title")
            setCenterString("")
        }
        
    else {
        setEndString("dayGridMonth,timeGridWeek,timeGridDay")
        setCenterString ("")
    }

        
    }, [data, isMobile, type]);


    const setEventsEffect = (resData) => {
       if(type === 'eleve') {
           setData(resData);
           //TODO NOt showing at all on view week and day
           setEvents(resData.map((item, index) => (
               {
                   key: item.id,
                   title: item.titre,
                   start: item.debut_de_coure,
                   end: item.fin_de_coure,
                   backgroundColor: 'gray',
                   description: <div>
                   <h1>{item.titre}</h1>
                   <p>Débute à {item.debut_de_coure}</p>
                   <p>Fini à {item.fin_de_coure}</p>
                   {<p className={item.etat === 2 ? "bg-blue-500 text-white" : item.etat ===1 ? "bg-red-500 text-white" : "bg-green-400 text-white" }>{TransformEtat(item.etat)}</p>}
                   </div>,
                
               }
           )))
           setisLoading(false)
       }
       if(type ==='admin') {
           setData(resData);

           setEvents(resData.map((item, index) => (
               {
                   key: item.id,
                   title: item.titre,
                   description: <div> 
                   <h1>{item.titre}</h1>
                   {item.membres.length === 1 ? <p>Individuel</p>: <p>Groupe</p>}
                   {<p className={item.etat === 2 ? "bg-blue-500 text-white" : item.etat ===1 ? "bg-red-500 text-white" : "bg-green-400 text-white" }>{TransformEtat(item.etat)}</p>}
                   {item.profe && <p>Professeur {item.profe.nom + ' ' + item.profe.prenom}</p>}
                   {item.membres &&<p> Eleves: {item.membres.map(value => {
                       return <p>-{value.nom} {value.prenom} </p>
                   })}</p>}
                   <p>{(new Date(item.debut_de_coure) - new Date(item.fin_de_coure)).hour}</p>
                   <p>Débute à {item.debut_de_coure}</p>
                   <p>Débute à {item.fin_de_coure}</p>
                   </div>,
                   start: item.debut_de_coure,
                   end: item.fin_de_coure,
                   backgroundColor: 'gray',
               }
           )))
           setisLoading(false)
       }

       
       if(type ==='prof') {
           setData(resData);
        //TODO is showing ? 
           setEvents(resData.map((item, index) => (
               {
                   key: item.id,
                   title: item.titre,
                   start: item.debut_de_coure,
                   end: item.fin_de_coure,
                   backgroundColor: 'gray',
                   description: <div>
                   <h1>{item.titre}</h1>
                   <p>Débute à {item.debut_de_coure}</p>
                   <p>Fini à {item.fin_de_coure}</p>
                   {<p className={item.etat === 2 ? "bg-blue-500 text-white" : item.etat ===1 ? "bg-red-500 text-white" : "bg-green-400 text-white" }>{TransformEtat(item.etat)}</p>}
                   </div>
               }
           )))
           setisLoading(false)
       }
   }
   if (!data) {
       if (type === 'admin') {
           axios
               .get(process.env.REACT_APP_API_URL + '/cours')
               .then(async (response) => {
                   let dataCours = response.data.data;
                   setPagination(response.data)
                   
                   //total 91
                   // 6 itérations
                   let nextPageUrl = response.data.next_page_url
                 
                   for(let i=1;i<response.data.last_page;i++){
                       if(response.data.next_page_url) {
                           let response1 = await axios.get(nextPageUrl)
                           nextPageUrl = response1.data.next_page_url
                            
                           // response1)
                          
                           dataCours = dataCours.concat(response1.data.data)
                       }
                   }
                  
                   if (dataCours.length === response.data.total){
                       
                       setEventsEffect(dataCours)
                   }
                       
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
                    
                       if (response.data)
                           setEventsEffect(response.data[0].coure)

                   }
               )

       if (type === 'prof') {
           axios
               .get(process.env.REACT_APP_API_URL + '/profs/')
               .then((response) => {
                   const profs = response.data;
                   if (profs)
                       setDataprofe(profs);
                       setEventsEffect(profs)
                  
               })
               .catch(error => {
                   console.error(error);
               });

           axios
               .get(process.env.REACT_APP_API_URL + '/profs/' + Cookies.get('profId')).then(
                   (response) => {
                       
                       if (response.data.cours)
                           setEventsEffect(response.data.cours)
                   }
               )
       }
   }
    //TODO use membres in data 
    

    

    const eventRender = (info) => {

        tippy(info.el, {
            placement: 'top',
            arrow: true,
            allowHTML: true,
            content: renderToString(info.event.extendedProps.description)
        }); 
        //arg.event.extendedProps.description
    }

    const convertTo24 = (time) => {
        if(time.startsWith('1')) {
            return time.replace('1','13').replace('p','h')
        }
        if(time.startsWith('2')) {
            return time.replace('2','14').replace('p','h')
        }
        if(time.startsWith('3')) {
            return time.replace('3','15').replace('p','h')
        }
        if(time.startsWith('4')) {
            return time.replace('4','16').replace('p','h')
        }
        if(time.startsWith('5')) {
            return time.replace('5','17').replace('p','h')
        }
        if(time.startsWith('6')) {
            return time.replace('6','18').replace('p','h')
        }
        if(time.startsWith('7')) {
            return time.replace('7','19').replace('p','h')
        }
        if(time.startsWith('8')) {
            return time.replace('8','20').replace('p','h')
        }
        if(time.startsWith('9')) {
            return time.replace('9','21').replace('p','h')
        }
        if(time.startsWith('10')) {
            return time.replace('10','22').replace('p','h')
        }
        if(time.startsWith('11')) {
            return time.replace('11','23').replace('p','h')
        }

            
    }

    
    
    const calendarComp = () => {
        
        return <>
        {isLoading ? <Audio></Audio> : 
        <div className="w-[full] border-t flex flex-col">
        <main className="p-6">
            {type === 'admin' && <>
            <button className="text-white bg-[#3788d8] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-3 justify-end"
            ><Link to="/cours/"><a>Vue Liste</a></Link></button>
            <button className="text-white bg-[#3788d8] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-3 justify-end"
            ><Link to="/admin/cours/add"><a>Ajouter un Cours</a></Link></button>
            </>} 
           

                <Fullcalendar id='calendar'
                    slotEventOverlap={true}
                    ref={calendarRef}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView={isMobile ? "timeGridDay": "dayGridMonth"}
                    allDaySlot={false}
                    
                    headerToolbar={{
                        start: "today prev next",
                        center: centerString,
                        end: endString
                    }}
                    businessHours={{
                        daysOfWeek: [1, 2, 3, 4, 5,6,7],
                        startTime: '08:00',
                        endTime: '23:00',
                    }}
                    slotLabelFormat={{
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                        
                    }}
                    hiddenDays={[]}
                    slotMinTime="08:00:00"
                    slotMaxTime="23:00:00"
                    height={'100vh'}
                    events={events}
                    eventClick={type === 'admin' && handleEventClick}
                    eventDidMount={eventRender}
                    eventContent={(eInfo)=> {
                        //try to put dotted color
                        return(
                            <>
                            <b>{eInfo.timeText.includes('p') ? 
                            convertTo24(eInfo.timeText)
                            : eInfo.timeText.includes('a') ? eInfo.timeText.replace('a','h') : 
                            ""
                            }</b>
                            <i>{eInfo.event.title}</i>
                            </>
                        )
                    }
                       
                    }
                    datesSet={(e) => {
                        /*console.log(e)
                        //catches change view event
                        if(calendarRef) {
                            if(calendarRef.current){
                                console.log(calendarRef.current.getApi())
                                //.changeView("timeGridDay") working
                                calendarRef.current.getApi().render()
                                //calendarRef.current.calendar.rerenderEvents()
                                //console.log(calendarRef.current)
                                //calendarRef.current.calendar.currentData.eventSources = null
                                //calendarRef.current.props.events = events
                                //console.log(calendarRef.current)
                            }
                            
                        }
                        */
                        /*if(events)
                        if(e.view.type === "timeGridWeek"){
                            console.log(events)
                            setEvents({})
                            setEvents(events) 
                        }
                        //
                        //*/
                        }}
                />
        </main>
    </div>}
            
        </>
    }

    const handleEventClick = (eventClickInfo) => {

        const clickedEvent = eventClickInfo.event;
        setSelectedEvent(clickedEvent);
        window.location.href = '/admin/cours/' + clickedEvent._def.extendedProps.key
        //setShow(true);
    };

    return (<>
        {!data ? <h1>Vous n'avez pas de cours</h1> : calendarComp()}
    </>
    )
}
export default Calendar;






/*

eventContent={(eInfo) => {
                        // Change the render
                        return (
                        <>
                        <b>{eInfo.timeText}</b>
                        <i>{eInfo.event.title}</i>
                      </>
                      
                      )
                    }
                       
                }
                */
