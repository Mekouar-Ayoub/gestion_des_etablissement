import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Fullcalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import Cookies from "js-cookie";





const Calendar = () => {
    const [profeData, setProfeData] = useState([]);
    const {id} = useParams();  
    useEffect(()=>{
        const token = Cookies.get('token');
    
        axios.get(`${process.env.REACT_APP_API_URL}/profs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          const data = response.data;
          setProfeData(data);
        })
        .catch(error => {
          if (error.response) {
            console.error('Error response:', error.response.status, error.response.data);
          } else if (error.request) {
            console.error('No response received:', error.request);
          } else {
            console.error('Request setup error:', error.message);
          }
        });
    },[id]);
    if(profeData.cours){
      var events = profeData.cours.map((item) => (
        {
            key: item.id,
            title: item.titre,
            start: item.debut_de_coure,
            end: item.fin_de_coure,
            backgroundColor: 'gray'
        }
    ));
    }
    return (
        <div className="w-full overflow-x-hidden border-t flex flex-col">
            <main className="w-full flex-grow p-6">
                <button className="text-white bg-[#3788d8] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-3 justify-end"
                ><Link to="/profes/Dashboard">Dashboard</Link></button>
                <button className="text-white bg-[#3788d8] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-3 justify-end"
                ><Link to="cours/AjouterCoure"><a>Ajouter un Cours</a></Link></button>
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
                    />
                </div>
            </main>
        </div>

    );
}
export default Calendar;