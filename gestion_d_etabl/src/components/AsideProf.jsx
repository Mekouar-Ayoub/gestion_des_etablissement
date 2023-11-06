
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";



const AsideProf = () => {

    const [prof, setProf] = useState({});
    useEffect(() => {

        const getMe = async () => {
            const response = await axios.get(process.env.REACT_APP_API_URL + '/profs/' + Cookies.get('profId'))
            setProf(response.data)
        }
        getMe();
    }, [])

    return (
        <>


                    <div className='h-[100%]'>

                    

                    <div className="mt-[15%] ml-[10%] ">
                        <h2>Bonjour {prof.prenom},</h2>

                    </div>

                    </div>


        </>
    )
}

export default AsideProf;