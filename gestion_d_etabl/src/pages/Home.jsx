import { Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillHeart, AiOutlineComment } from "react-icons/ai";
import Navgition from "../components/Navgition"


function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/getPublication')
            .then(response => {
                const data = response.data.data;
                setData(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    if (!sessionStorage.token) {
        return <Navigate to="/member/Login" />;
    }
    return (
        <>
        
        <div>
           
            <Navgition />
            <div>
                <div>
                    {data.map((item) => (
                        <div key={item.id} className=" border w-[35vw] ml-auto mr-auto rounded mt-[50px] pt-6">
                            <div >
                                <img src={`http://localhost:8000/images/${item.image}`} className="w-[30vw] ml-auto mr-auto" alt="" />
                            </div>
                            <div className="w-[30vw] ml-auto mr-auto ">
                                <div className="flex"> 
                                    <AiFillHeart style={{fontSize:'30px'}} />
                                    <AiOutlineComment style={{fontSize:'30px'}} />
                                </div>
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

export default Home;
