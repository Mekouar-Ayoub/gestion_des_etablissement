import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineUser } from "react-icons/ai";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import RoundedButton from "../../components/Rounded-Boutton";
import { Audio } from "react-loader-spinner";

function EleveProfile({ isModifying }) {
  const [userData, setUserData] = useState({});
  const [familleMembers, setFamilleMembers] = useState([]);
  const [showFamily, setShowFamily] = useState(false);
  const url =
    process.env.REACT_APP_API_URL + "/eleves/" + Cookies.get("eleveId");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(url);
        console.log(response);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/famille/eleves/" +
          Cookies.get("eleveId")
      )
      .then((response) => {
        console.log(response);
        setFamilleMembers(response.data);
      });
  }, [url]);

  const handleSaveClick = () => {
    console.log(userData);
    axios.put(
      process.env.REACT_APP_API_URL +
        "/eleves/" +
        Cookies.get("eleveId") +
        "/self-modify",
      userData
    );
  };

  //TODO recenter and show family
  const showComp = () => {
    return (
      <>
        <img
          src="/images/CarreauxBleu.svg"
          className="absolute inset-y-750 right-0 mt-[5%] z-[-1]"
        ></img>
        <img
          src="/images/CarreauxRouge.svg"
          className="absolute bottom-0 left-0 mb-[0%] z-[-1]"
        ></img>
        <div className="w-[100%] rounded flex items-center mt-[-3%]">
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
                  Ecole
                </label>
                <input
                  className="bg-gray-200 w-[75%] flex ml-auto mr-auto"
                  readOnly
                  value={userData.ecole}
                  type="text"
                />
              </div>
              <div className=" mt-[5%] ">
                <div htmlFor="" className="w-[75%] ml-auto mr-auto my-2">
                    <div className="text-right">
                  <Link to={"/eleve/profil/modify"} >
                    <RoundedButton
                      text={"Changer mes infos"}
                      type="student"
                      className="bg-blue-500 p-2 rounded"
                    ></RoundedButton>
                  </Link>
                  </div>
                  <div className="text-center mt-[5%]">
                    <span
                      onClick={() => {
                        console.log("ok");
                        setShowFamily(!showFamily);
                      }}
                    >
                      <RoundedButton
                        text={"Voir les autres membres de la famille"}
                        type="student"
                        className="bg-blue-500 p-2 rounded "
                      ></RoundedButton>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showFamily &&
          familleMembers
            .filter((value) => value.id != Cookies.get("eleveId"))
            .map((item) => {
              return (
                <>
                  <div className="w-[100%] rounded flex items-center mb-[15%] mt-[5%]">
                    <div className="w-[75%] ml-auto mr-auto flex items-center">
                      <div className="w-full ml-auto mr-auto flex-col items-center">
                        <div className="w-full my-3">
                          <label className="w-[75%]  flex ml-auto mr-auto ">
                            Nom
                          </label>
                          <input
                            type="text"
                            className="bg-gray-200 w-[75%] flex ml-auto mr-auto"
                            readOnly
                            value={item.nom}
                          ></input>
                        </div>
                        <div className="w-full my-3">
                          <label className="w-[75%] flex ml-auto mr-auto mt-[5%] ">
                            Prenom
                          </label>
                          <input
                            type="text"
                            className="bg-gray-200 w-[75%] flex  ml-auto mr-auto"
                            readOnly
                            value={item.prenom}
                          ></input>
                        </div>
                        <div className="w-full my-3">
                          <label className="w-[75%] flex  ml-auto mr-auto mt-[5%] ">
                            Téléphone
                          </label>
                          <input
                            type="text"
                            className="bg-gray-200 w-[75%] flex ml-auto mr-auto"
                            readOnly
                            value={item.tel}
                          ></input>
                        </div>
                        <div className="w-full my-3">
                          <label className="w-[75%] flex ml-auto mr-auto mt-[5%] ">
                            Email
                          </label>
                          <input
                            type="text"
                            className="bg-gray-200 w-[75%] flex ml-auto mr-auto"
                            readOnly
                            value={item.email}
                          ></input>
                        </div>
                        {item.etudient === 1 ? (
                          <div>
                            <div className="w-full my-3">
                              <label className="w-[75%] flex ml-auto mr-auto mt-[5%] ">
                                Solde Actuel
                              </label>
                              <input
                                type="text"
                                className="bg-gray-200 w-[75%] flex ml-auto mr-auto"
                                readOnly
                                value={item.solde}
                              ></input>
                            </div>
                            <div className="w-full my-3">
                              <label className="w-[75%] flex ml-auto mr-auto mt-[5%] ">
                                Ecole
                              </label>
                              <input
                                type="text"
                                className="bg-gray-200 w-[75%] flex ml-auto mr-auto"
                                readOnly
                                value={item.ecole}
                              ></input>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="w-full my-3">
                              <label className="w-[75%] flex ml-auto mr-auto mt-[5%] ">
                                Profession
                              </label>
                              <input
                                type="text"
                                className="bg-gray-200 w-[75%] flex ml-auto mr-auto"
                                readOnly
                                value={item.profession}
                              ></input>
                            </div>
                            <div className="w-full my-3">
                              <label className="w-[75%] flex ml-auto mr-auto mt-[5%] ">
                                Ton/Ta
                              </label>
                              <input
                                type="text"
                                className="bg-gray-200 w-[75%] flex ml-auto mr-auto"
                                readOnly
                                value={item.type}
                              ></input>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
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
        <div className="w-[85vw] rounded flex items-center">
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
                  Ecole
                </label>
                <input
                  className="border-x-0 border-t-0 w-[75%] flex ml-auto mr-auto"
                  defaultValue={userData.ecole}
                  type="text"
                  onChange={(event) => {
                    console.log(event.target.value);
                    const newUserData = userData;
                    newUserData["ecole"] = event.target.value;
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
                  <Link to={"/eleve/profil"}>
                    <RoundedButton
                      text={"Sauvegarder"}
                      type="student"
                      className="bg-blue-500 p-2 rounded"
                    ></RoundedButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {
            /*
 <button>Modifier Famille</button>
        {familleMembers
          .filter((value) => value.id != Cookies.get("eleveId"))
          .map((item) => {
            return <p>{item.nom}</p>;
          })}
            */
        }
       
      </>
    );
  };

  return (
    <>{userData ? isModifying ? modifyComp() : showComp() : <Audio></Audio>}</>
  );
}

export default EleveProfile;
