import React, { useEffect, useState } from "react";
import axios from "axios";

function Auth() {
  const [profe, setProfe] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/showallprofe")
      .then((response) => {
        const profeData = response.data;
        setProfe(profeData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
profe.map((item)=>(
    
    item.token === sessionStorage.token &&(
        console.log(item.type)
    )
))
}

export default Auth;
