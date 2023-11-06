import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { isPlatform } from "@ionic/react";

const ProfSolde = () => {
  const [soldes, setSoldes] = useState([]);
  const [prof, setProf] = useState();
  const [totalHeures, setTotalHeures] = useState(0);
  const [cours, setCours] = useState([]);
  const [nombreDeCours, setNombreDeCours] = useState(0);
  const [isMobile, setIsMobile] = useState(!isPlatform("desktop"));
  const [prixHoraire, setPrixHoraire] = useState(0);

  //TODO do mobile
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/profs/" + Cookies.get("profId"))
      .then((response) => {
        setProf(response.data);
        setCours(response.data.cours);
        setNombreDeCours(response.data.cours.length);
        setPrixHoraire(response.data.tarif);
        let total = 0.0;
        response.data.cours.map((value) => {
          value.debut_de_coure.replace(" ", "T");
          value.debut_de_coure += ".500Z";
          var d = new Date(value.debut_de_coure);
          value.fin_de_coure.replace(" ", "T");
          value.fin_de_coure += ".500Z";
          var f = new Date(value.fin_de_coure);
          total += (f.getTime() - d.getTime()) / 1000 / 3600;
        });
        setTotalHeures(total);
      });

    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/profs/" +
          Cookies.get("profId") +
          "/solde"
      )
      .then((response) => {
        console.log(response.data);
        setSoldes(response.data);
      });
  }, []);

  //TODO nombre heures +  DO mobile (prendre exemple solde et faire la meme pour les autres)

  return (
    <>
      {isMobile ? (
        <>
          <div className="font-solde-text">
            <div className="cadran-eleve-solde">
              <div className="flex">
                <p className="pt-[2%] mt-[5%] font-solde-title">
                  <strong>Solde actuel</strong>
                </p>
                <div className="rounded-xl  ml-[5%] w-[30%] bg-color-cadran-student py-4 pr-3 pl-2 text-white align-center">
                  <span className="pl-2">{prof && prof.solde}</span>
                  <p className="text-white text-right text-xs">(en DHS)</p>
                </div>
              </div>
              <div className="flex">
                <div className="rounded-xl mt-[2%] w-[90%] student-background py-4 pr-3 pl-2 text-white align-center">
                  <span className="pl-2">{nombreDeCours} Séances</span>
                  <p className="text-white text-right text-xs">
                    Total des séances
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="rounded-xl mt-[2%] w-[90%] student-background py-4 pr-3 pl-2 text-white align-center">
                  <span className="pl-2">{totalHeures}</span>
                  <p className="text-white text-right text-xs">
                    Total des heures
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="rounded-xl mt-[2%] w-[90%] student-background py-4 pr-3 pl-2 text-white align-center">
                  <span className="pl-2">{prixHoraire}</span>
                  <p className="text-white text-right text-xs">Dhs/h</p>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[1%] border-b-2 ml-[5%] mr-[5%] w-[90%]"></div>
          <div className="ml-[15%] mt-[5%] mb-[5%]">
            <h1 className="font-solde-title">
              <strong>Historique</strong>
            </h1>
            {soldes &&
              soldes.map((value) => {
                return (
                  <div className="mt-[2%]">
                    <p>
                      {value.type === "le professeur a été payé"
                        ? "Vous avez été payé :"
                        : ""}{" "}
                      <br /> {-value.prix_a_rendre} Dhs le <br />{" "}
                      {value.created_at.split("T")[0]}
                      <br /> en {value.type_de_paiement}
                    </p>
                    {cours.find((item) => item.id === value.coure_id) && (
                      <>
                        <p>
                          {
                            cours.find((item) => item.id === value.coure_id)
                              .titre
                          }
                        </p>
                        <p>
                          a duré {value.nombre_heures} pour un prix horaire de :{" "}
                          {value.cour_id && value.coure_id != -1 && (
                            <>
                              {
                                cours.find((item) => item.id === value.cour_id)
                                  .prix_horaire
                              }{" "}
                            </>
                          )}
                        </p>
                        <p>pour un prix total de : {value.prix}</p>
                      </>
                    )}
                  </div>
                );
              })}
          </div>
        </>
      ) : (
        <>
          <div className="flex font-solde-text">
            <div className="cadran-eleve-solde flex">
              <p className="w-[20%] pt-[2%] ml-[-15%] font-solde-title">
                <strong>Solde actuel :</strong>
              </p>
              <div className="rounded-xl ml-[2%] w-[10%] bg-color-cadran-student py-4 pr-3 pl-2 text-white align-center">
                <span className="pl-2">{prof && prof.solde}</span>
                <p className="text-white text-right text-xs">(en DHS)</p>
              </div>

              <div className="rounded-xl  ml-[25%]  w-[20%] student-background py-4 pr-3 pl-2 text-white align-center">
                <span className="pl-2">{nombreDeCours} Séances</span>
                <p className="text-white text-right text-xs">
                  Total des séances
                </p>
              </div>

              <div className="rounded-xl  ml-[5%]  w-[10%] student-background py-4 pr-3 pl-2 text-white align-center">
                <span className="pl-2">{totalHeures}</span>
                <p className="text-white text-right text-xs">
                  Total des heures
                </p>
              </div>
              <div className="rounded-xl  ml-[5%] w-[10%] student-background py-4 pr-3 pl-2 text-white align-center">
                <span className="pl-2">{prixHoraire}</span>
                <p className="text-white text-right text-xs">Dhs/h</p>
              </div>
            </div>
          </div>
          <div className="h-[10%] border-b-2 ml-[5%] mr-[10%]"></div>
          <div className="ml-[15%] mt-[5%] mb-[5%]">
            <h1 className="font-solde-title">
              <strong>Historique</strong>
            </h1>
            {soldes &&
              soldes.map((value) => {
                return (
                  <div className="mt-[2%]">
                    <p>
                      {value.type} : {-value.prix_a_rendre} Dhs le{" "}
                      {value.created_at.split("T")[0]} en{" "}
                      {value.type_de_paiement}
                    </p>
                    {cours.find((item) => item.id === value.coure_id) && (
                      <>
                        <p>
                          {
                            cours.find((item) => item.id === value.coure_id)
                              .titre
                          }
                        </p>
                        <p>
                          a duré {value.nombre_heures} pour un prix horaire de :{" "}
                          {value.cour_id && value.coure_id != -1 && (
                            <>
                              {
                                cours.find((item) => item.id === value.cour_id)
                                  .prix_horaire
                              }{" "}
                            </>
                          )}
                        </p>
                        <p>pour un prix total de : {value.prix}</p>
                      </>
                    )}
                  </div>
                );
              })}
          </div>
        </>
      )}
    </>
  );
};

export default ProfSolde;

/*

created_at
: 
"2023-10-12T18:18:03.000000Z"
id
: 
1
nombre_heures
: 
0
prix_a_rendre
: 
500
prof_id
: 
1
profit
: 
0
type
: 
"le professeur a été créer"
type_de_paiement
: 
"solde initial"
updated_at
: 
"2023-10-12T18:18:03.000000Z"

<h3>Type de mouvement {value.type}</h3>
<p>{cours.find((item) => item.id === value.cour_id).titre}</p>
                  <p>
                    a duré {value.nombre_heures} pour un prix horaire de :{" "}
                    
                    {value.cour_id && value.cour_id != -1 && (
                <>
                 {
                      cours.find((item) => item.id === value.cour_id)
                        .prix_horaire
                    }{" "}
                </>
              )}
                  </p>
                  <p>pour un prix total de : {value.prix}</p>


                   
              <p>
                Vous avez été payé {value.prix} Dhs
                -{" "}
                
                {value.created_at
                  .split("T")[0]
                  }{" "}
                   - {value.type_de_paiement}
              </p>
*/
