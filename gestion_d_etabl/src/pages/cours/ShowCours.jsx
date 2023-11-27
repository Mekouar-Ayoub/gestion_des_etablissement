import React, { useEffect, useState } from "react";
import {
  AiOutlineMenu,
  AiFillCalendar,
  AiOutlineUser,
  AiOutlineInsertRowAbove,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import Aside from "../../components/Aside";
import { TransformEtat, intToDayString } from "../../utils/common-objects";
import { Pagination, Stack } from "@mui/material";
import { Audio } from "react-loader-spinner";

function index({ user }) {
  const [data, setData] = useState([]);
  const [dataToShow, setDataToShow] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [individuel, setIndividuel] = useState(-1);
  const [dayFilter, setdayFilter] = useState(-1);
  const [pagination, setPagination] = useState();
  const [allCours, setAllCours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllCours = async(allCours,pagination) => {

      let tmpAllCours=allCours
      let nextPageUrl = pagination.next_page_url
      for(let i=1;i<pagination.last_page;i++){
        if(pagination.next_page_url) {
            let response1 = await axios.get(nextPageUrl)
            nextPageUrl = response1.data.next_page_url
            tmpAllCours = tmpAllCours.concat(response1.data.data)
        }
    }
    
    setAllCours(tmpAllCours)
    setIsLoading(false)
    }
    axios.get(process.env.REACT_APP_API_URL + "/cours").then((response) => {
      console.log(response);
      //TODO cannot sort because of pagination
      setPagination(response.data);
      setData(response.data.data);
      setDataToShow(response.data.data);

      getAllCours(response.data.data, response.data)
      
      
      
    });
  }, []);

  const handleSearchInput = (e) => {
    setIndividuel(-1)
    setdayFilter(-1)
    if (e.target.value === "") {
      setDataToShow(allCours);
    }

    let searchText = e.target.value.toLowerCase();
    console.log(searchText);
    setSearchInput(searchText);
    let newDataToShow = [];
    if (
      searchText.match(
        /^((?:19|20)\d\d)[- /.](0[1-9]|1[012])?[- /.]?(0[1-9]|[12][0-9]|3[01])?$/
      )
    ) {
      allCours.map((item) => {
        if (
          item.debut_de_coure.includes(searchText) ||
          item.fin_de_coure.includes(searchText)
        ) {
          newDataToShow.push(item);
        }
      });
      setDataToShow(newDataToShow);
    } else {
      let found = false;
      allCours.map((item) => {
        item.membres.map((value) => {
          if (
            value.nom.toLowerCase().includes(searchText) ||
            value.prenom.toLowerCase().includes(searchText)
          ) {
            newDataToShow.push(item);
            found = true;
          }
        });

        if (
          item.profe.nom.toLowerCase().includes(searchText) ||
          item.profe.prenom.toLowerCase().includes(searchText)
        ) {
          newDataToShow.push(item);
          found = true;
        }
        if (found === false) {
          item.titre.toLowerCase().includes(searchText) &&
            newDataToShow.push(item);
        }
      });

      //TODO search prof + titre + eleves
      setDataToShow(newDataToShow);
    }
  };

  const comp = () => {
    return (<>
      <div className="w-full  border-t flex flex-col">
        <main className="w-full flex-grow p-6">
          <h1 className="text-3xl text-black pb-6">Liste des cours</h1>
          <button className="text-white bg-[#3788d8] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-3 justify-end">
            <Link to="/admin/calendar">Vue Calendrier</Link>
          </button>
          <button className="text-white bg-[#3788d8] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-3 justify-end">
            {user === "admin" ? (
              <Link to={"/admin/cours/add"}>
                <a>Ajouter un cours</a>
              </Link>
            ) : (
              <></>
            )}
          </button>
          <br />

          <div>
          {dayFilter === -1 && <div>
            <button
              onClick={() => {
                setIndividuel(1);
                setdayFilter(-1)
                setSearchInput("")
                //TODO check
                setDataToShow(allCours.filter((value) => value.membres.length === 1));
              }}
              className={
                individuel === 1
                  ? "bg-blue-500 text-white p-3"
                  : "bg-white border-2 p-3"
              }
            >
              Individuel
            </button>
            <button
              onClick={() => {
                setIndividuel(0);
                setdayFilter(-1)
                setSearchInput("")
                setDataToShow(allCours.filter((value) => value.membres.length > 1));
              }}
              className={
                individuel === 0
                  ? "bg-blue-500 text-white p-3"
                  : "bg-white border-2 p-3"
              }
            >
              Groupe
            </button>
            {(individuel === 0 ||
              individuel === 1)  && (
                <button
                  readOnly={individuel === ""}
                  className="bg-red-500 text-white p-3"
                  onClick={() => {
                    setDataToShow(data);
                    setIndividuel(-1);
                  }}
                >
                  Vider le filtre
                </button>
              )}
              </div>}
            <br />
            {individuel === -1 && (
            <div className="flex w-[50%]">
                <div
                  className={
                    dayFilter === 1
                      ? "rounded-full border-2  bg-blue-500 text-white cursor-pointer w-[5%] text-center"
                      : "rounded-full border-2 bg-white cursor-pointer w-[5%] text-center"
                  }
                  onClick={() => {
                    setdayFilter(1);
                    setSearchInput("")
                    setDataToShow(
                        allCours.filter((value) => {
                          return new Date(value.debut_de_coure).getDay() === 1;
                        })
                      );
                  }}
                >
                  L
                </div>
                <div
                  className={
                    dayFilter === 2
                      ? "rounded-full border-2 bg-blue-500 text-white cursor-pointer w-[5%] text-center"
                      : "rounded-full border-2 bg-white cursor-pointer w-[5%] text-center"
                  }
                  onClick={() => {
                    setdayFilter(2);
                    setSearchInput("")
                    setDataToShow(
                        allCours.filter((value) => {
                          return new Date(value.debut_de_coure).getDay() === 2;
                        })
                      );
                  }}
                >
                  Ma
                </div>
                <div
                  className={
                    dayFilter === 3
                      ? "rounded-full border-2  bg-blue-500 text-white cursor-pointer w-[5%] text-center"
                      : "rounded-full border-2 bg-white cursor-pointer w-[5%] text-center"
                  }
                  onClick={() => {
                    setdayFilter(3);
                    setSearchInput("")
                    setDataToShow(
                        allCours.filter((value) => {
                          return new Date(value.debut_de_coure).getDay() === 3;
                        })
                      );
                  }}
                >
                  Me
                </div>
                <div
                  className={
                    dayFilter === 4
                      ? "rounded-full border-2  bg-blue-500 text-white cursor-pointer w-[5%] text-center"
                      : "rounded-full border-2 bg-white cursor-pointer w-[5%] text-center"
                  }
                  onClick={() => {
                    setdayFilter(4);
                    setSearchInput("")
                    setDataToShow(
                        allCours.filter((value) => {
                          return new Date(value.debut_de_coure).getDay() === 4;
                        })
                      );
                  }}
                >
                  J
                </div>
                <div
                  className={
                    dayFilter === 5
                      ? "rounded-full border-2  bg-blue-500 text-white cursor-pointer w-[5%] text-center"
                      : "rounded-full border-2 bg-white cursor-pointer w-[5%] text-center"
                  }
                  onClick={() => {
                    setdayFilter(5);
                    setSearchInput("")
                    setDataToShow(
                        allCours.filter((value) => {
                          return new Date(value.debut_de_coure).getDay() === 5;
                        })
                      );
                  }}
                >
                  V
                </div>
                <div
                  className={
                    dayFilter === 6
                      ? "rounded-full border-2  bg-blue-500 text-white cursor-pointer w-[5%] text-center"
                      : "rounded-full border-2 bg-white cursor-pointer w-[5%] text-center"
                  }
                  onClick={() => {
                    setdayFilter(6);
                    setSearchInput("")
                    setDataToShow(
                        allCours.filter((value) => {
                          return new Date(value.debut_de_coure).getDay() === 6;
                        })
                      );
                  }}
                >
                  S
                </div>
                <div
                  className={
                    dayFilter === 0
                      ? "rounded-full border-2  bg-blue-500 text-white cursor-pointer w-[5%] text-center"
                      : "rounded-full border-2 bg-white cursor-pointer w-[5%] text-center"
                  }
                  onClick={() => {
                    setdayFilter(0);
                    setSearchInput("")
                    setDataToShow(
                      allCours.filter((value) => {
                        return new Date(value.debut_de_coure).getDay() === 0;
                      })
                    );
                  }}
                >
                  D
                </div>
                {dayFilter != -1 && (
                  <button
                    readOnly={individuel === -1}
                    className="bg-red-500 text-white px-3"
                    onClick={() => {
                      setDataToShow(data);
                      setdayFilter(-1);
                    }}
                  >
                    Vider le filtre
                  </button>
                )}
              </div>
            )}
            <input
              value={searchInput}
              onChange={handleSearchInput}
              className="border-2 mb-[2%]"
            ></input>
            <label>
              Chercher par Date(YYYY-MM-JJ) Professeur eleve ou instrument
            </label>
          </div>

          <div className="w-full">
            <div className="bg-white w-full">
              <div className="flex justify-end"></div>
              <table className="w-full bg-white">
                <thead className="">
                  <tr className="w-full">
                    <th className="text-left py-3 uppercase font-semibold text-sm">
                      Cours de {" "}
                    </th>
                    <th className="text-left py-3 uppercase font-semibold text-sm">
                      Etat du cours
                    </th>
                    <th className="text-left py-3 uppercase font-semibold text-sm">
                      Debut du cours
                    </th>
                    <th className="text-left py-3 uppercase font-semibold text-sm">
                      Fin du cours
                    </th>
                    <th className="text-left py-3 uppercase font-semibold text-sm">
                      Type de cours
                    </th>
                    <th className="text-left py-3 uppercase font-semibold text-sm">
                      Professeur
                    </th>
                    <th className="text-left py-3 uppercase font-semibold text-sm">
                      Eleves
                    </th>
                    <th className="text-left py-3 uppercase font-semibold text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {dataToShow.map((item, index) => (
                    <tr key={index}>
                      <td className="text-left py-3">{item.titre}</td>
                      <td className="text-left py-3">
                        <span className="hover:text-blue-500">
                          {TransformEtat(item.etat)}
                        </span>
                      </td>
                      <td className="text-left py-3">
                        <span className="hover:text-blue-500">
                          {intToDayString(new Date(item.debut_de_coure).getDay())} {item.debut_de_coure}
                        </span>
                      </td>
                      <td className="text-left py-3">
                        <span className="hover:text-blue-500">
                          {intToDayString(new Date(item.fin_de_coure).getDay())} {item.fin_de_coure}
                        </span>
                      </td>
                      <td className="text-left py-3">
                        <span className="hover:text-blue-500">
                          {item.membres.length === 1 ? "Individuel" : "Groupe"}
                        </span>
                      </td>
                      <td className="text-left py-3">
                        <span className="hover:text-blue-500">
                          {item.profe.nom} {item.profe.prenom}
                        </span>
                      </td>
                      <td className="text-left py-3">
                        <span className="hover:text-blue-500">
                          {item.membres.map((value) => {
                            return value.nom + " " + value.prenom + " ,";
                          })}
                        </span>
                      </td>
                      <td className="text-left py-3 flex">
                        <Link to={`/admin/cours/${item.id}`}>
                          <a className="hover:text-blue-500">
                            <img src="/images/AddMember.svg" />
                          </a>
                        </Link>
                        <Link to={`/admin/cours/${item.id}`}>
                          <a className="hover:text-blue-500">
                            <img src="/images/ModifyIcon.svg" />
                          </a>
                        </Link>
                        {item.etat == 2 && (
                          <button
                            className=""
                            onClick={() => {
                              console.log(item);

                              let newCours = item;
                              item.etat = 1;
                              newCours.etat = 1;
                              console.log(newCours);
                              axios
                                .put(
                                  process.env.REACT_APP_API_URL +
                                    "/cours/" +
                                    item.id,
                                  newCours
                                )
                                .catch((error) => {
                                  console.error(error);
                                });
                              window.location.href = "/admin/cours";
                            }}
                          >
                            <img src="/images/CancelIcon.svg" className="" />
                          </button>
                        )}

                        {(item.etat == 0 || item.etat == 1) && (
                          <button
                            className=""
                            onClick={() => {
                              console.log(item);
                              let newCours = item;
                              item.etat = 2;
                              newCours.etat = 2;
                              console.log(newCours);
                              axios
                                .put(
                                  process.env.REACT_APP_API_URL +
                                    "/cours/" +
                                    item.id,
                                  newCours
                                )
                                .catch((error) => {
                                  console.error(error);
                                });
                              window.location.href = "/admin/cours";
                            }}
                          >
                            <img src="/images/ValidIcon.svg" />
                          </button>
                        )}
                        <button onClick={() => {
                          //TODO check 
                          axios.delete(process.env.REACT_APP_API_URL+'/cours/'+item.id)
                        }} className="hover:bg-white">
                         
                            <img src="/images/Delete.svg" />
                         
                        </button>
                      </td>
                    </tr>
                  ))}
                  {pagination && individuel === -1 && dayFilter === -1 && searchInput === "" ? <Stack spacing={2}>
                    <Pagination onChange={async (e,value) => {
                      console.log(value)
                      setDataToShow((await axios.get(pagination.links[value].url)).data.data)
                      setIndividuel(-1)
                      setdayFilter(-1)
                      setSearchInput("")
                    }}count={pagination.last_page} />
      
            </Stack> : <button
            className="bg-red-500 text-white border-2 px-5 py-3"
            onClick={() => {
              setIndividuel(-1)
              setdayFilter(-1)
              setSearchInput("")
            }}
            >Vider les Filtres pour reprendre la pagination</button>
            }
           
            
                  
                </tbody>
                
              </table>
              
            </div>
          </div>
        </main>
      </div>
    </>)
  }

  //TODO add cours ajouter nom prof pas que prenom
  return (
    <>
    {isLoading ? <Audio></Audio> : comp()}
    </>
  );
}

export default index;

/*

const data = response.data.data;    
                data.map((value,index)=> {
                    axios
                    .get(process.env.REACT_APP_API_URL+'/cours/'+value.id)
                    .then(response1 => {
                        
                        console.log(response1.data)
                            if(response1.data.length >0 ){
                                response1.data.map((value) => {
                                    axios.get(process.env.REACT_APP_API_URL+'/eleves/'+response1.data.membre_id)
                                    .then(response2=> {
                                        console.log(response2.data)
                                        newElevesCoursArray.push({
                                            coursId : value.id,
                                            eleves: response2.data
                                        })
                                })
                                
                            }

                            else{
                                axios.get(process.env.REACT_APP_API_URL+'/eleves/'+response1.data.membre_id)
                                .then(response2=> {
                                    console.log(response2.data)
                                    newElevesCoursArray.push({
                                        coursId : value.id,
                                        eleves: response2.data
                                    })
                            }
                            
                                
                    setCoursWithEleves(newElevesCoursArray)
                            }
                            
                            )
                        }
                        
                    )
                })

                */
