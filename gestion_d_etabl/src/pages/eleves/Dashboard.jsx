import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Aside from "../../components/Aside"
import Cookies from "js-cookie";
import { Link, Navigate } from "react-router-dom";
import UserAside from "../../components/AsideUser";
import axios from "axios";

const EleveDashboard = () =>{
   const [publications, setPublications] = useState([]);
    useEffect(()=> {
        axios.get(process.env.REACT_APP_API_URL + '/publications').then( response=> {
            console.log(response)
            setPublications(response.data.data)
        }
        )
    },[])
    return (
        <div className="bg-white font-family-karla flex">
            <div className="w-[25%] border-r-2 align-top">
        <UserAside></UserAside></div>
            <div className="w-[75%]flex flex-col h-screen overflow-y-hidden">

                <h1 className="student-dashboard-title student-primary ml-[15%]">Les Dernières Nouvelles de notre école : Restez Informés !</h1>
                {publications.map((value) => {
                     return <div className="flex mt-[5%] ml-[15%]" >
                    <div className="w-[35%]">
                        {value.image &&  <img src={value.image}></img>}
                        {value.vedeo && <video>
                            <source src={value.vedeo} type="video/mp4" />
                        </video>
                        }
                    </div> 
                    <div className="ml-[2%]">
                         
                    <h1>{value.titre && value.titre}</h1>
                    {value.created_at && <p>{''+ value.created_at.split('.')[0].replace('T',' à ')}</p>}
                    {value.description && <p>{value.description}</p>}
                    </div> 
                    </div>
                })}
        </div>
    </div>
            );
}
export default EleveDashboard;