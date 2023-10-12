/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import Retour from "../../components/Retour";

function UpdateMember({isModifying}) {
  const location = useLocation()
  const [isModify, setisModify] = useState(isModifying);
  const { eleveId } = useParams()
  const [data, setData] = useState({});
  const [nom, setNom] = useState(data.nom);
  const [prenom, setPrenom] = useState(data.prenom);
  const [tel, setTel] = useState(data.tel);
  const [email, setEmail] = useState(data.email);
  const [adresse, setAdresse] = useState(data.adresse);
  const [solde, setSold] = useState(data.solde);
  const [famille_id, setFamilleId] = useState(data.famille_id);
  const [famille, setFamille] = useState();
  const [etudient, setEtudient] = useState(data.etudient);
  const [type, setType] = useState(data.type);
  const [payment, setPayment] = useState(0);
  const [isPaying, setIsPaying] = useState(false);

  //TODO ajouter le solde au changement et à la vue
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/eleves/${eleveId}`)
      .then(response => {
        const data = response.data;
        console.log(data)
        setData(data);
        setNom(data.nom)
        setPrenom(data.prenom);
        setTel(data.tel);
        setEmail(data.email);
        setAdresse(data.adresse);
        setSold(data.solde);
        setFamilleId(data.famille_id);
        axios.get(process.env.REACT_APP_API_URL+'/families/'+ data.famille_id).then((response1 => {
          setFamille(response1.data.nom)
        }))
        setEtudient(data.etudient);
        setType(data.type);
      })
      .catch(error => {
        console.error(error);
      });
  }, [eleveId]);

  const handleSubmit = () => {
    axios.put(`${process.env.REACT_APP_API_URL}+'/eleves/${data.id}`, {
      nom,
      prenom,
      tel,
      email,
      adresse,
      solde,
      famille_id,
      etudient,
      type,
    })
    .then(function (response) {
      setisModify(false);
    })
    .catch(function (error) {
      console.log(error);
    });    
  }



  const UpdateComp= () => {
    return <div className="flex w-[98vw] h-[100vh]">
      <div className="flex flex-col ml-auto">
        <div className="ml-auto">
          <Retour to='/admin/eleves/'></Retour>
          <div className="w-[100vw] rounded  flex items-center">
            <div className="w-[75%] bg-gray-100 ml-auto mr-auto h-[75%] flex items-center">
              <div className="w-full bg-gray-100 ml-auto mr-auto flex-col items-center">
                {!isPaying && <button className="bg-green-500">Eleve payé</button>}
                {isPaying &&<><input type="number" value={payment} onChange={(e) =>
                  {
                    setPayment(e.target.value)
                    
                  } }></input> <button className="bg-green-500" onClick={() => {
                    //TODO Working ?
                    axios.put(process.env.REACT_APP_API_URL + 'eleves/'+eleveId+'/solde', {solde: payment})
                  }}>Enregistrer</button></>}
              <div className="w-full my-3">
                    <label htmlFor="" className="w-[75%] flex ml-auto mr-auto my-2">nom</label>
                    <input className=" w-[75%] flex ml-auto mr-auto" value={nom} onChange={(e) => setNom(e.target.value)} type="text" />
                  </div>
                  <div className="w-full" >
                    <label htmlFor="" className="w-[75%] flex ml-auto mr-auto my-2">prenom</label>
                    <input className=" w-[75%] flex ml-auto mr-auto" value={prenom} onChange={(e) => setPrenom(e.target.value)} type="text" />
                  </div>
                  <div className=" my-3">
                    <label htmlFor="" className="w-[75%] flex ml-auto mr-auto my-2" >tel</label>
                    <input className=" w-[75%] flex ml-auto mr-auto" value={tel} onChange={(e) => setTel(e.target.value)} type="text" />
                  </div>
                  <div className=" my-3" >
                    <label htmlFor="" className="w-[75%] flex ml-auto mr-auto my-2" >email</label>
                    <input className=" w-[75%] flex ml-auto mr-auto" value={email} onChange={(e) => setEmail(e.target.value)} type="text" />
                  </div>
                  <div className=" my-3">
                    <label htmlFor="" className="w-[75%] flex ml-auto mr-auto my-2" >adresse</label>
                    <input className=" w-[75%] flex ml-auto mr-auto" value={adresse} onChange={(e) => setAdresse(e.target.value)} type="text" />
                  </div>
                  <div className=" my-3" hidden>
                    <label htmlFor="" className="w-[75%] flex ml-auto mr-auto my-2" >solde</label>
                    <input className=" w-[75%] flex ml-auto mr-auto" value={solde} onChange={(e) => setSold(e.target.value)} type="text" />
                  </div>
                  <div className=" my-3" hidden>
                    <label htmlFor="" className="w-[75%] flex ml-auto mr-auto my-2" >familleId</label>
                    <input className=" w-[75%] flex ml-auto mr-auto" value={famille_id} onChange={(e) => setFamilleId(e.target.value)} type="text" />
                  </div>
                  <div className=" my-3" hidden>
                    <input className=" w-[75%] flex ml-auto mr-auto" value={etudient} onChange={(e) => setEtudient(e.target.value)} type="text" hidden/>
                  </div>
                  <div className=" my-3" hidden>
                    <input className=" w-[75%] flex ml-auto mr-auto" value={type} onChange={(e) => setType(e.target.value)} type="text" hidden/>
                  </div>
                <div className="my-3 w-[75%] ml-auto mr-auto ">
                  <button onClick={handleSubmit} className="bg-blue-500 p-2 rounded">Enregistrer</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  }

  const ShowComp = () => {
    return <div className="flex w-[98vw] h-[100vh]">
      <div className="flex flex-col ml-auto">
        <div className="ml-auto">
          <div className="w-[100vw] rounded  flex items-center">
            <div className="w-[75%] bg-gray-100 ml-auto mr-auto h-[75%] flex items-center">
              <div className="w-full bg-gray-100 ml-auto mr-auto flex-col items-center">
              <div className="w-full my-3">
                    <label htmlFor="" className="w-[75%] flex ml-auto mr-auto my-2">nom</label>
                    <p className=" w-[75%] flex ml-auto mr-auto" >
                      {nom} </p>
                  </div>
                  <div className="w-full" >
                    <label htmlFor="" className="w-[75%] flex ml-auto mr-auto my-2">prenom</label>
                    <p className=" w-[75%] flex ml-auto mr-auto" >
                      {prenom} </p>
                  </div>
                  <div className=" my-3">
                    <label htmlFor="" className="w-[75%] flex ml-auto mr-auto my-2" >tel</label>
                    <p className=" w-[75%] flex ml-auto mr-auto" >
                      {tel} </p>
                  </div>
                  <div className=" my-3" >
                    <label htmlFor="" className="w-[75%] flex ml-auto mr-auto my-2" >email</label>
                    <p className=" w-[75%] flex ml-auto mr-auto" >
                      {email} </p>
                  </div>
                  <div className=" my-3" hidden>
                    <label htmlFor="" className="w-[75%] flex ml-auto mr-auto my-2" >adresse</label>
                    <p className=" w-[75%] flex ml-auto mr-auto" >
                      {adresse} </p>
                  </div>
                  <div className=" my-3" hidden>
                    <label htmlFor="" className="w-[75%] flex ml-auto mr-auto my-2" >solde</label>
                    <p className=" w-[75%] flex ml-auto mr-auto" >
                      {solde} </p>
                  </div>
                  <div className=" my-3" >
                    <label htmlFor="" className="w-[75%] flex ml-auto mr-auto my-2" >famille</label>
                    <p className=" w-[75%] flex ml-auto mr-auto" >
                      {famille} </p>
                  </div>
                  <div className=" my-3" >
                  <p className=" w-[75%] flex ml-auto mr-auto" >
                      {etudient ? 'Est un étudiant' : "n'est pas un étudiant"} </p>
                  </div>
                  <div className=" my-3" >
                  <p className=" w-[75%] flex ml-auto mr-auto" >
                      est un {type} </p>
                  </div>
                <div className="my-3 w-[75%] ml-auto mr-auto ">
                  <button onClick={() => {
                    console.log()
                    setisModify(true);
                  }} className="bg-blue-500 p-2 rounded">Modifier</button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  }

  return (<>
    {isModify ? UpdateComp() : ShowComp()}
    </>
  );
}

export default UpdateMember;
