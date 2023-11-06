import { Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillHeart, AiOutlineComment } from "react-icons/ai";
import Navgation from "../components/Navgition"


function PublicationsHome() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get(process.env.REACT_APP_API_URL+'/publications')
            .then(response => {
                const data = response.data;
                console.log(data)
                setData(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    //TODO get Image inject binary directly not path
    return (
        <>
        
        <div>
           
            <Navgation />
            <div>
                <div>
                    {data.map((item) => (
                        <div key={item.id} className=" border w-[35vw] ml-auto mr-auto rounded mt-[50px] pt-6">
                            <div >
                                <img src={`${process.env.REACT_APP_API_URL}/images/${item.image}`} className="w-[30vw] ml-auto mr-auto" alt="" />
                            </div>
                            <div className="w-[30vw] ml-auto mr-auto ">
                                <div className="flex"> 
                                    <AiFillHeart style={{fontSize:'30px'}} />
                                    <AiOutlineComment style={{fontSize:'30px'}} />
                                </div>
                                <h1>{item.titre}</h1>
                                <p className="ml-auto mr-auto">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
}

export default PublicationsHome;
