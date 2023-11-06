
import { isPlatform } from "@ionic/react";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";



const UserAside = () => {

    const [eleve, setEleve] = useState({});
    useEffect(() => {

        const getMe = async () => {
            const response = await axios.get(process.env.REACT_APP_API_URL + '/eleves/' + Cookies.get('eleveId'))
            setEleve(response.data)
        }
        getMe();
    }, [])

    return (
        <>


                    <div className='h-[100%]'>

                    

                    <div className="mt-[15%] ml-[10%] w-[89%] break-words">
                        <h2 className={!isPlatform('desktop') && "text-xs"}>Bonjour<br /> {eleve.prenom},</h2>

                    </div>

                    </div>


        </>
    )
}

export default UserAside;