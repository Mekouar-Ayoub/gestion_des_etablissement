import React, { useState, useEffect } from "react";
import {
  AiOutlineMenu,
  AiFillCalendar,
  AiOutlineUser,
  AiOutlineInsertRowAbove,
} from "react-icons/ai";
import Aside from "../../components/Aside";
import { Link } from "react-router-dom";
import axios from "axios";
import { typeDePaiements } from "../../utils/common-objects";
import { Audio } from "react-loader-spinner";
function Dashoard() {
  const [data, setData] = useState([]);

  const [isPaying, setIsPaying] = useState();
  const [prixAPayer, setPrixApayer] = useState(0);
  const [eleveId, setEleveId] = useState();
  const [dataToShow, setDataToShow] = useState([]);
  const [typePaiement, setTypePaiement] = useState("");
  const [onlyEleves, setOnlyEleves] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/familles/eleves")
      .then((response) => {
        console.log(response);
        setData(response.data);
        setDataToShow(
            response.data.filter((value) => value.etudient == 1)
          );
          setIsLoading(false)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleOnClickPay = (id) => {
    setIsPaying(true);
    setEleveId(id);
  };

  const onSaveClick = () => {
    console.log(prixAPayer);
    console.log(eleveId);
    let confirmed = confirm(
      "L'eleve a payé :" + prixAPayer + " etes vous sur ? "
    );

    if (confirmed) {
      axios
        .put(process.env.REACT_APP_API_URL + "/eleves/" + eleveId + "/solde", {
          solde: prixAPayer,
          type_de_paiement: typePaiement,
        })
        .then((response) => {
          console.log(response);
          axios
            .get(process.env.REACT_APP_API_URL + "/eleves")
            .then((response) => {
              setData(response.data);
             
              console.log(response);
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((e) => {
          console.error(e);
        });
      //window.location.href='/admin/profs'
    }
    setIsPaying(false);
  };
  return (
    <>
    {isLoading ? <Audio></Audio> : 
    <div className="w-full overflow-x-hidden border-t flex flex-col">
    <main className="w-full flex-grow p-6">
      <h1 className="text-3xl text-black pb-6">
        Tout les membres de toutes les familles
      </h1>
      <div className="w-full ">
        <button className={!onlyEleves ? 'bg-blue-500 px-3 py-2' : 'bg-white px-3 py-2'}
          onClick={() => {
            setOnlyEleves(false);
            setDataToShow(data);
          }}
        >
          Afficher tout le monde
        </button>
        <button className={onlyEleves ? 'bg-blue-500 px-3 py-2' : 'bg-white px-3 py-2'}
          onClick={() => {
            setOnlyEleves(true);
            setDataToShow(data.filter((value) => value.etudient === 1));
          }}
        >
          Afficher seulement les eleves
        </button>
        <div className="bg-white overflow-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-[#3788d8] text-white">
              <tr>
                <th className=" text-left py-3 px-4 uppercase font-semibold text-sm">
                  Nom
                </th>
                <th className=" text-left py-3 px-4 uppercase font-semibold text-sm">
                  Prenom
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Téléphone
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Email
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Famille
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Solde
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {dataToShow.map((item) => (
                <tr key={item.id}>
                  <td className=" text-left py-3 px-4">{item.nom}</td>
                  <td className=" text-left py-3 px-4">{item.prenom}</td>
                  <td className="text-left py-3 px-4">
                    <p className="hover:text-blue-500">{item.tel}</p>
                  </td>
                  <td className="text-left py-3 px-4">
                    <p className="hover:text-blue-500">{item.email}</p>
                  </td>
                  <td className="text-left py-3 px-4">
                    <p className="hover:text-blue-500">{item.famille.nom}</p>
                  </td>
                  
                  <td className="text-left py-3 px-4">
                    <p className="hover:text-blue-500">
                      {item.etudient && item.solde}
                    </p>
                  </td>
                  <td className="text-left py-3 px-4 flex">
                    {!isPaying && (
                      <>
                        <a
                          className="hover:text-blue-500"
                          href={"/admin/eleves/" + item.id + "/modify"}
                        >
                          <img src="/images/ModifyIcon.svg" />
                        </a>
                        {/* --------------------------- */}
                        <a className="hover:text-red-500">
                          <img src="/images/Delete.svg" />
                        </a>
                        <a
                          className="hover:text-blue-500"
                          href={"/admin/eleves/" + item.id}
                        >
                          <img src="/images/Details.svg" />
                        </a>
                        <button
                          className="bg-green-400 p-3 text-white"
                          onClick={() => handleOnClickPay(item.id)}
                        >
                          L'eleve a Payé
                        </button>
                      </>
                    )}
                    {isPaying && (
                      <>
                        <div>
                          <label>Montant payé par l'éléve</label>
                          <br />
                          <input
                            className="border-2 bg-blue-200"
                            onChange={(e) => {
                              setPrixApayer(e.target.value);
                            }}
                          />
                        </div>
                        <div className="ml-[1%]">
                          <label>Type de Paiement</label>
                          <br />
                          <select
                            onChange={(e) => setTypePaiement(e.target.value)}
                          >
                            {Object.values(typeDePaiements).map((value) => {
                              return <option value={value}>{value}</option>;
                            })}
                          </select>
                        </div>
                        <button
                          className="bg-green-400 p-3"
                          onClick={onSaveClick}
                        >
                          Enregister
                        </button>
                        <button
                          className="bg-red-500 p-3"
                          onClick={() => {
                            setIsPaying(false);
                          }}
                        >
                          Annuler
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
    }
    </>

    
  );
}
export default Dashoard;
