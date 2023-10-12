import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineUser } from "react-icons/ai";
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import RoundedButton from "../../components/Rounded-Boutton";

function EleveProfile({isModifying}) {
    const [userData, setUserData] = useState(null);
    const url = process.env.REACT_APP_API_URL +"/eleves/"+Cookies.get('eleveId');
   
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(url);
                console.log(response)
                setUserData(response.data);

            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        fetchUserData();
    }, [])

    const handleSaveClick = () => {
        console.log(userData)
        axios.put(process.env.REACT_APP_API_URL + '/eleves/'+Cookies.get('eleveId')+'/self-modify', 
            userData
        )
    }

    


    const showComp = () => {
        return <>
        
            
                    <img src='/CarreauxBleu.svg' className="absolute inset-y-750 right-0 mt-[5%]"></img>
                    <img src='/CarreauxRouge.svg' className="absolute bottom-0 left-0 mb-[0%]"></img>
                    <div className="w-[85vw] rounded h-[70vh] flex items-center">
                        <div className="w-[75%]  ml-auto mr-auto h-[75%] flex items-center">
                            <div className="w-full  ml-auto mr-auto flex-col items-center">
                                
                                <div className="w-full">
                                    <label htmlFor="" className="w-[75%] flex ml-auto mr-auto mt-[5%]">Nom</label>
                                    <input className="bg-gray-200 w-[75%] flex ml-auto mr-auto" readOnly value={userData.nom} type="text" />
                                </div>
                                <div className=" my-3">
                                    <label htmlFor="" className="w-[75%] flex ml-auto mr-auto mt-[5%]" >Prenom</label>
                                    <input className="bg-gray-200 w-[75%] flex ml-auto mr-auto" readOnly value={userData.prenom} type="text" />
                                </div>
                                <div className="w-full my-3">
                                    <label htmlFor="" className="w-[75%] flex ml-auto mr-auto mt-[5%] ">Email</label>
                                    <input className="bg-gray-200 w-[75%] flex ml-auto mr-auto" readOnly value={userData.email} type="text" />
                                </div>
                                <div className=" mt-[5%] ">
                                    <div htmlFor="" className="w-[75%] flex ml-auto mr-auto my-2 justify-end" >
                                    <Link to={'/eleve/profil/modify'}><RoundedButton text={'Changer mes infos'} type='student' className="bg-blue-500 p-2 rounded"></RoundedButton></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </>
    }

    const modifyComp = () => {
        return <>
        
            
        <img src='/CarreauxViolet.svg' className="absolute inset-y-750 right-0 mt-[5%]"></img>
        <img src='/CarreauxBleu.svg' className="absolute bottom-0 left-0"></img>
        <div className="w-[85vw] rounded h-[70vh] flex items-center">
            <div className="w-[75%]  ml-auto mr-auto h-[75%] flex items-center">
                <div className="w-full  ml-auto mr-auto flex-col items-center">
                    
                    <div className="w-full">
                        <label htmlFor="" className="w-[75%] flex ml-auto mr-auto mt-[5%] mb-[2%]">Nom</label>
                        <input className="border-x-0 border-t-0 w-[75%] flex ml-auto mr-auto"  defaultValue={userData.nom} type="text" onChange={(event) => {
                            console.log(event.target.value)
                            const newUserData = userData
                            newUserData['nom'] = event.target.value
                            setUserData(newUserData)
                        }} />
                    </div>
                    <div className=" my-3">
                        <label htmlFor="" className="w-[75%] flex ml-auto mr-auto mt-[5%] mb-[2%]" >Prenom</label>
                        <input className="border-x-0 border-t-0 w-[75%] flex ml-auto mr-auto"  defaultValue={userData.prenom} type="text" onChange={(event) => {
                            console.log(event.target.value)
                            const newUserData = userData
                            newUserData['prenom'] = event.target.value
                            setUserData(newUserData)
                        }}/>
                    </div>
                    <div className="w-full my-3">
                        <label htmlFor="" className="w-[75%] flex ml-auto mr-auto mt-[5%] mb-[2%]">Email</label>
                        <input className="border-x-0 border-t-0 w-[75%] flex ml-auto mr-auto"  defaultValue ={userData.email} type="text" onChange={(event) => {
                            console.log(event.target.value)
                            const newUserData = userData
                            newUserData['email'] = event.target.value
                            setUserData(newUserData)
                        }}/>
                    </div>
                    <div className=" mt-[5%] ">
                        <div htmlFor="" className="w-[75%] flex ml-auto mr-auto my-2 justify-end" onClick={handleSaveClick} >
                        <Link to={'/eleve/profil'}><RoundedButton text={'Sauvegarder'} type='student' className="bg-blue-500 p-2 rounded"></RoundedButton></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    }

    if (userData === null) {
        return <div>Loading...</div>;
    } else {
        return (
            <>

            {isModifying ? modifyComp() : showComp()}
            
            </>
        )
    }

}

export default EleveProfile;