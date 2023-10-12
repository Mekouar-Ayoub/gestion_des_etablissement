import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "../utils/sign-out";



const NavBarProf = ()=> {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isSlidOpen, setIsslidOpen] = useState(false)

    const [prof, setProf] = useState({});
    useEffect( () => {

        const getMe = async () =>{
            const response = await axios.get(process.env.REACT_APP_API_URL+'/profs/'+Cookies.get('profId'))
            console.log(response)
            setProf(response.data)
        }
        getMe();
    },[])

    return (
<header className="w-full items-center py-2 px-6 h-[10%] border-b-2 flex ">

           <img className="ml-[5%] mt-[5%] mb-[5%]" src='/BlueIcon.svg' width={70} height={70}> 
          </img>
          <div className="justify-between w-[100%] flex mt-[5%] ml-[15%]" >
                        <Link className="mr-[5%] pb-[2%] student-border-selection border-b-2 w-[30%]"  to='/eleve/dashboard'><button className="flex w-[200%]"><img src='/Fil.svg'></img> <span className="ml-[5%] student-primary">Fil d'actualité</span></button></Link>
                        <Link className="mr-[15%]" to='/eleve/calendar'><button className="flex w-[200%]"><img src='/Calendar.svg'></img><span className="ml-[5%] text-stone-400">Emploi du temps</span></button></Link>
                        <Link className="mr-[15%]" to='/eleve/solde/'><button className="flex w-[200%]"><img src='/Solde.svg'></img><span className="ml-[5%] text-stone-400">Solde</span></button></Link>
                        <Link className="mr-[15%]" to='/eleve/profil'><button className="flex w-[200%]"><img src='/Profile.svg'></img><span className="ml-[5%] text-stone-400">Profil</span></button></Link>
                    </div>
                    <div className="relative flex justify-end w-[25%]">
                        <button  onClick={() => setIsslidOpen(!isSlidOpen)} className="flex">
                    <img className='mt-[15%]' src="/ArrowDown.svg"></img>
                        <div className="realtive z-10 w-12 h-12 rounded-lg overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none">
                            <img src="/Profile.svg" className='mt-[10%] ml-[17%]' />
                        </div>
                        </button>
                        {isSlidOpen && (
                            <div className="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16">
                                <a href="#" className="block px-4 py-2 account-link hover:text-white">Account</a>
                                <a href="/support" className="block px-4 py-2 account-link hover:text-white">Support</a>
                                <a onClick={()=>{
                                    signOut()
                                }} className="block px-4 py-2 account-link hover:text-white">Se deconnecter</a>
                            </div>
                        )}
                    </div>
                    
                </header>

    )

}

export default NavBarProf