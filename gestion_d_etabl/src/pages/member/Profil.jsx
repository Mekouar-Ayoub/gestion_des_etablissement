import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineUser } from "react-icons/ai";
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

function profil() {
    const [userData, setUserData] = useState(null);
    const url = "http://localhost:8000/api/member";
   
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = Cookies.get('token')
                if (!token) {
                    console.error("JWT token is missing.");
                    return;
                }
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response)
                setUserData(response.data);

            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        fetchUserData();
    }, [])

    const valuetoke = Cookies.get('token')
    const headers = Cookies.get('headers')
  
    if (headers !== 2 && !valuetoke) {
      return <Navigate to="/" />;
    }

    if (userData === null) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
            <div className="  fixed bg-blue-500 w-[100vw] h-12 z-50">
                <h1 className=" ml-10">profile</h1>
            </div>
                <div className="flex w-[98vw]">
                    <div className=" w-[15vw] fixed bg-blue-500 h-[100vh] overscroll-y-none">
                        <div>
                        <h1 className=" text-[25px] mt-20 ml-6">Member</h1>
                        </div>
                    </div>
                    <div className="flex flex-col ml-auto ">
                        <div className="ml-auto">
                            <div className="w-[75%] mt-16 rounded h-[20vh]  ml-auto mr-auto bg-gray-100">
                                <div className="flex items-center">
                                    <AiOutlineUser className="w-8 h-8 text-red-500" />
                                    <h1 className=" text-[25px]">{userData.prenom } {userData.nom}</h1>
                                </div>
                            </div>
                            <div className="w-[85vw] rounded h-[70vh] flex items-center">
                                <div className="w-[75%] bg-gray-100 ml-auto mr-auto h-[75%] flex items-center">
                                    <div className="w-full bg-gray-100 ml-auto mr-auto flex-col items-center">
                                        <div className="w-full my-3">
                                            <label htmlFor="" className="w-[75%] flex ml-auto mr-auto my-2">email</label>
                                            <input className=" w-[75%] flex ml-auto mr-auto" readOnly value={userData.email} type="text" />
                                        </div>
                                        <div className="w-full">
                                            <label htmlFor="" className="w-[75%] flex ml-auto mr-auto my-2">nom</label>
                                            <input className=" w-[75%] flex ml-auto mr-auto" readOnly value={userData.nom} type="text" />
                                        </div>
                                        <div className=" my-3">
                                            <label htmlFor="" className="w-[75%] flex ml-auto mr-auto my-2" >prenom</label>
                                            <input className=" w-[75%] flex ml-auto mr-auto" readOnly value={userData.prenom} type="text" />
                                        </div>
                                        <div className=" my-3 ">
                                            <div htmlFor="" className="w-[75%] flex ml-auto mr-auto my-2 justify-between" >
                                                <button className="bg-blue-500 p-2 rounded"><Link to={`/member/UpdateMember/${userData.id}`}>update</Link></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[75%] mt-16 rounded h-[20vh]  ml-auto mr-auto bg-gray-100 mb-8">
                                <div className="flex items-center">
                                    <p> <p>Hello,</p></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

export default profil;