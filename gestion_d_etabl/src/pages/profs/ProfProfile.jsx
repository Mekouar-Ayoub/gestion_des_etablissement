import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineUser } from "react-icons/ai";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import RoundedButton from "../../components/Rounded-Boutton";
import { isPlatform } from "@ionic/react";
import { Audio } from "react-loader-spinner";

function ProfProfile({ isModifying }) {
  const [userData, setUserData] = useState(null);
  const url = process.env.REACT_APP_API_URL + "/profs/" + Cookies.get("profId");
  const [isMobile, setIsMobile] = useState(!isPlatform("desktop"));
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(url);
        console.log(response);
        setUserData(response.data);
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [url]);

  const handleSaveClick = () => {
    console.log(userData);
    axios.put(
      process.env.REACT_APP_API_URL + "/profs/" + Cookies.get("profId"),
      userData
    );
  };

  const showCompMobile = () => {
    return (
      <>
        <img
          src="/images/CarreauxViolet.svg"
          className="absolute inset-y-750 right-0 mt-[5%] z-[-1]"
        ></img>
        <img
          src="/images/CarreauxRouge.svg"
          className="absolute bottom-0 left-0 mb-[0%] z-[-1]"
        ></img>
        <div className="w-[100%] h-[80vh] rounded flex justify-center items-center mt-[5%]">
          <div className="w-[75%] ml-auto mr-auto h-[75%] flex items-center">
            <div className="w-full  ml-auto mr-auto flex-col items-center">
              <div className="w-full">
                <label
                  htmlFor=""
                  className="w-[75%] flex ml-auto mr-auto mt-[5%]"
                >
                  Nom
                </label>
                <input
                  className="bg-gray-200 w-[75%] flex ml-auto mr-auto"
                  readOnly
                  value={userData.nom}
                  type="text"
                />
              </div>
              <div className=" my-3">
                <label
                  htmlFor=""
                  className="w-[75%] flex ml-auto mr-auto mt-[5%]"
                >
                  Prenom
                </label>
                <input
                  className="bg-gray-200 w-[75%] flex ml-auto mr-auto"
                  readOnly
                  value={userData.prenom}
                  type="text"
                />
              </div>
              <div className="w-full my-3">
                <label
                  htmlFor=""
                  className="w-[75%] flex ml-auto mr-auto mt-[5%] "
                >
                  Email
                </label>
                <input
                  className="bg-gray-200 w-[75%] flex ml-auto mr-auto"
                  readOnly
                  value={userData.email}
                  type="text"
                />
              </div>
              <div className="w-full my-3">
                <label
                  htmlFor=""
                  className="w-[75%] flex ml-auto mr-auto mt-[5%] "
                >
                  Tel
                </label>
                <input
                  className="bg-gray-200 w-[75%] flex ml-auto mr-auto"
                  readOnly
                  value={userData.tel}
                  type="text"
                />
              </div>
              <div className="w-full my-3">
                <label
                  htmlFor=""
                  className="w-[75%] flex ml-auto mr-auto mt-[5%] "
                >
                  Adresse
                </label>
                <input
                  className="bg-gray-200 w-[75%] flex ml-auto mr-auto"
                  readOnly
                  value={userData.adress}
                  type="text"
                />
              </div>
              <div className="w-full my-3 hidden">
                <label
                  htmlFor=""
                  className="w-[75%] flex ml-auto mr-auto mt-[5%] "
                >
                  instrument
                </label>
                <input
                  className="bg-gray-200 w-[75%] flex ml-auto mr-auto"
                  readOnly
                  value={userData.email}
                  type="text"
                />
              </div>
              <div className=" mt-[5%] ">
                <div
                  htmlFor=""
                  className="w-[75%] flex ml-auto mr-auto my-2 justify-end"
                >
                  <Link to={"/prof/profil/modify"}>
                    <RoundedButton
                      text={"Changer mes infos"}
                      type="student"
                      className="prof-background p-2 rounded"
                    ></RoundedButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const showComp = () => {
    return (
      <>
        <img
          src="/images/CarreauxViolet.svg"
          className="absolute inset-y-750 right-0 mt-[5%] z-[-1]"
        ></img>
        <img
          src="/images/CarreauxRouge.svg"
          className="absolute bottom-0 left-0 mb-[0%] z-[-1]"
        ></img>
        <div className="w-[85vw] rounded h-[70vh] flex items-center mt-[10%]">
          <div className="w-[75%]  ml-auto mr-auto h-[75%] flex items-center">
            <div className="w-full  ml-auto mr-auto flex-col items-center">
              <div className="w-full">
                <label
                  htmlFor=""
                  className="w-[75%] flex ml-auto mr-auto mt-[5%]"
                >
                  Nom
                </label>
                <input
                  className="bg-gray-200 w-[75%] flex ml-auto mr-auto"
                  readOnly
                  value={userData.nom}
                  type="text"
                />
              </div>
              <div className=" my-3">
                <label
                  htmlFor=""
                  className="w-[75%] flex ml-auto mr-auto mt-[5%]"
                >
                  Prenom
                </label>
                <input
                  className="bg-gray-200 w-[75%] flex ml-auto mr-auto"
                  readOnly
                  value={userData.prenom}
                  type="text"
                />
              </div>
              <div className="w-full my-3">
                <label
                  htmlFor=""
                  className="w-[75%] flex ml-auto mr-auto mt-[5%] "
                >
                  Email
                </label>
                <input
                  className="bg-gray-200 w-[75%] flex ml-auto mr-auto"
                  readOnly
                  value={userData.email}
                  type="text"
                />
              </div>
              <div className="w-full my-3">
                <label
                  htmlFor=""
                  className="w-[75%] flex ml-auto mr-auto mt-[5%] "
                >
                  Tel
                </label>
                <input
                  className="bg-gray-200 w-[75%] flex ml-auto mr-auto"
                  readOnly
                  value={userData.tel}
                  type="text"
                />
              </div>
              <div className="w-full my-3">
                <label
                  htmlFor=""
                  className="w-[75%] flex ml-auto mr-auto mt-[5%] "
                >
                  Adresse
                </label>
                <input
                  className="bg-gray-200 w-[75%] flex ml-auto mr-auto"
                  readOnly
                  value={userData.adress}
                  type="text"
                />
              </div>
              <div className="w-full my-3 hidden">
                <label
                  htmlFor=""
                  className="w-[75%] flex ml-auto mr-auto mt-[5%] "
                >
                  instrument
                </label>
                <input
                  className="bg-gray-200 w-[75%] flex ml-auto mr-auto"
                  readOnly
                  value={userData.email}
                  type="text"
                />
              </div>
              <div className=" mt-[5%] ">
                <div
                  htmlFor=""
                  className="w-[75%] flex ml-auto mr-auto my-2 justify-end"
                >
                  <Link to={"/prof/profil/modify"}>
                    <RoundedButton
                      text={"Changer mes infos"}
                      type="student"
                      className="prof-background p-2 rounded"
                    ></RoundedButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const modifyCompMobile = () => {
    return (
      <>
        <img
          src="/images/CarreauxViolet.svg"
          className="absolute inset-y-750 right-0 mt-[5%]"
        ></img>
        <img
          src="/images/CarreauxBleu.svg"
          className="absolute bottom-0 left-0"
        ></img>
        <div className="w-[100%] h-[80vh] rounded flex items-center mt-[5%]">
          <div className="w-[75%]  ml-auto mr-auto h-[75%] flex items-center">
            <div className="w-full  ml-auto mr-auto flex-col items-center">
              <div className="w-full">
                <label
                  htmlFor=""
                  className="w-[75%] flex ml-auto mr-auto mt-[5%] mb-[2%]"
                >
                  Nom
                </label>
                <input
                  className="border-x-0 border-t-0 w-[75%] flex ml-auto mr-auto"
                  defaultValue={userData.nom}
                  type="text"
                  onChange={(event) => {
                    console.log(event.target.value);
                    const newUserData = userData;
                    newUserData["nom"] = event.target.value;
                    setUserData(newUserData);
                  }}
                />
              </div>
              <div className=" my-3">
                <label
                  htmlFor=""
                  className="w-[75%] flex ml-auto mr-auto mt-[5%] mb-[2%]"
                >
                  Prenom
                </label>
                <input
                  className="border-x-0 border-t-0 w-[75%] flex ml-auto mr-auto"
                  defaultValue={userData.prenom}
                  type="text"
                  onChange={(event) => {
                    console.log(event.target.value);
                    const newUserData = userData;
                    newUserData["prenom"] = event.target.value;
                    setUserData(newUserData);
                  }}
                />
              </div>
              <div className="w-full my-3">
                <label
                  htmlFor=""
                  className="w-[75%] flex ml-auto mr-auto mt-[5%] mb-[2%]"
                >
                  Email
                </label>
                <input
                  className="border-x-0 border-t-0 w-[75%] flex ml-auto mr-auto"
                  defaultValue={userData.email}
                  type="text"
                  onChange={(event) => {
                    console.log(event.target.value);
                    const newUserData = userData;
                    newUserData["email"] = event.target.value;
                    setUserData(newUserData);
                  }}
                />
              </div>
              <div className="w-full my-3">
                <label
                  htmlFor=""
                  className="w-[75%] flex ml-auto mr-auto mt-[5%] mb-[2%]"
                >
                  Tel
                </label>
                <input
                  className="border-x-0 border-t-0 w-[75%] flex ml-auto mr-auto"
                  defaultValue={userData.tel}
                  type="text"
                  onChange={(event) => {
                    console.log(event.target.value);
                    const newUserData = userData;
                    newUserData["tel"] = event.target.value;
                    setUserData(newUserData);
                  }}
                />
              </div>
              <div className="w-full my-3">
                <label
                  htmlFor=""
                  className="w-[75%] flex ml-auto mr-auto mt-[5%] mb-[2%]"
                >
                  Adresse
                </label>
                <input
                  className="border-x-0 border-t-0 w-[75%] flex ml-auto mr-auto"
                  defaultValue={userData.adress}
                  type="text"
                  onChange={(event) => {
                    console.log(event.target.value);
                    const newUserData = userData;
                    newUserData["adress"] = event.target.value;
                    setUserData(newUserData);
                  }}
                />
              </div>
              <div className=" mt-[5%] ">
                <div
                  htmlFor=""
                  className="w-[75%] flex ml-auto mr-auto my-2 justify-end"
                  onClick={handleSaveClick}
                >
                  <Link to="">
                    <RoundedButton
                      text={"Sauvegarder"}
                      type="student"
                      className="prof-background p-2 rounded"
                    ></RoundedButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  const modifyComp = () => {
    return (
      <>
        <img
          src="/images/CarreauxViolet.svg"
          className="absolute inset-y-750 right-0 mt-[5%]"
        ></img>
        <img
          src="/images/CarreauxBleu.svg"
          className="absolute bottom-0 left-0"
        ></img>
        <div className="w-[85vw] rounded h-[70vh] flex items-center mt-[15%]">
          <div className="w-[75%]  ml-auto mr-auto h-[75%] flex items-center">
            <div className="w-full  ml-auto mr-auto flex-col items-center">
              <div className="w-full">
                <label
                  htmlFor=""
                  className="w-[75%] flex ml-auto mr-auto mt-[5%] mb-[2%]"
                >
                  Nom
                </label>
                <input
                  className="border-x-0 border-t-0 w-[75%] flex ml-auto mr-auto"
                  defaultValue={userData.nom}
                  type="text"
                  onChange={(event) => {
                    console.log(event.target.value);
                    const newUserData = userData;
                    newUserData["nom"] = event.target.value;
                    setUserData(newUserData);
                  }}
                />
              </div>
              <div className=" my-3">
                <label
                  htmlFor=""
                  className="w-[75%] flex ml-auto mr-auto mt-[5%] mb-[2%]"
                >
                  Prenom
                </label>
                <input
                  className="border-x-0 border-t-0 w-[75%] flex ml-auto mr-auto"
                  defaultValue={userData.prenom}
                  type="text"
                  onChange={(event) => {
                    console.log(event.target.value);
                    const newUserData = userData;
                    newUserData["prenom"] = event.target.value;
                    setUserData(newUserData);
                  }}
                />
              </div>
              <div className="w-full my-3">
                <label
                  htmlFor=""
                  className="w-[75%] flex ml-auto mr-auto mt-[5%] mb-[2%]"
                >
                  Email
                </label>
                <input
                  className="border-x-0 border-t-0 w-[75%] flex ml-auto mr-auto"
                  defaultValue={userData.email}
                  type="text"
                  onChange={(event) => {
                    console.log(event.target.value);
                    const newUserData = userData;
                    newUserData["email"] = event.target.value;
                    setUserData(newUserData);
                  }}
                />
              </div>
              <div className="w-full my-3">
                <label
                  htmlFor=""
                  className="w-[75%] flex ml-auto mr-auto mt-[5%] mb-[2%]"
                >
                  Tel
                </label>
                <input
                  className="border-x-0 border-t-0 w-[75%] flex ml-auto mr-auto"
                  defaultValue={userData.tel}
                  type="text"
                  onChange={(event) => {
                    console.log(event.target.value);
                    const newUserData = userData;
                    newUserData["tel"] = event.target.value;
                    setUserData(newUserData);
                  }}
                />
              </div>
              <div className="w-full my-3">
                <label
                  htmlFor=""
                  className="w-[75%] flex ml-auto mr-auto mt-[5%] mb-[2%]"
                >
                  Adresse
                </label>
                <input
                  className="border-x-0 border-t-0 w-[75%] flex ml-auto mr-auto"
                  defaultValue={userData.adress}
                  type="text"
                  onChange={(event) => {
                    console.log(event.target.value);
                    const newUserData = userData;
                    newUserData["adress"] = event.target.value;
                    setUserData(newUserData);
                  }}
                />
              </div>
              <div className=" mt-[5%] ">
                <div
                  htmlFor=""
                  className="w-[75%] flex ml-auto mr-auto my-2 justify-end"
                  onClick={handleSaveClick}
                >
                  <Link to="">
                    <RoundedButton
                      text={"Sauvegarder"}
                      type="student"
                      className="prof-background p-2 rounded"
                    ></RoundedButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (<>
    {isLoading ? <Audio></Audio> : 
    <>
    {!isMobile ? (
      <>{isModifying ? modifyComp() : showComp()}</>
    ) : (
      <>{isModifying ? modifyCompMobile() : showCompMobile()}</>
    )}
  </>}
    
    
    </>);
}

export default ProfProfile;
