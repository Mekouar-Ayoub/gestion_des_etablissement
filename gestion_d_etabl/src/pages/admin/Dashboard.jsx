import React, { useState ,useEffect} from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Aside from "../../components/Aside"
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function Dashoard() {
    
    const headers = Cookies.get('headers')
    const valuetoke = Cookies.get('token')
    //TODO check this
    if (headers !== "0" || !valuetoke) {
        console.log(headers)
      return <Navigate to="/" />;
    }

    return (<>
            <div className="w-full flex flex-col h-screen overflow-y-hidden">
            
                <div className="w-full overflow-x-hidden border-t flex flex-col">
                    <main className="w-full flex-grow p-6">
                        <h1 className="text-3xl text-black pb-6">Dashboard</h1>
                        <div className="w-full">

                            <div className="bg-white overflow-auto flex justify-evenly h-[25vh] items-center">
                                <div className=" border rounded px-[100px] py-[40px]">espace A</div>
                                <div className=" border rounded px-[100px] py-[40px]">espace B</div>
                                <div className=" border rounded px-[100px] py-[40px]">espace C</div>
                            </div>
                        </div>
                    </main>
                </div>
            </div >
        
        </>);
}
export default Dashoard;