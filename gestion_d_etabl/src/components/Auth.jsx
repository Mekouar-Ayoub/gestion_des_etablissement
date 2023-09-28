import React, { useEffect, useState } from "react";
import axios from "axios";

function Auth() {
  const [userData, setUserData] = useState(null);
  const apiUrl = "http://localhost:8000/api/admins";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          console.error("JWT token is missing.");
          return;
        }
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  if (userData === null) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
      {
        console.log(userData.type)
      }
      </>
    )
  }
}

export default Auth;