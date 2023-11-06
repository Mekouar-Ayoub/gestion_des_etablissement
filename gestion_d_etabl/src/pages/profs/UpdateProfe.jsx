import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import Retour from "../../components/Retour";
import { MenuItem, TextField } from "@mui/material";
import {typesDeCours} from "../../utils/common-objects"

function UpdateMember() {
  const { profId } = useParams()
  const [profeData, setProfeData] = useState({});
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [tel, setTel] = useState('');
  const [email, setEmail] = useState('');
  const [adress, setAdress] = useState('');
  const [instrument, setInstrument] = useState('');
  const [cv, setCv] = useState('');
  const [tarif, setTarif] = useState('');
  const [solde, setSolde] = useState('');


  console.log(profeData[0])
  useEffect(() => {
    
    axios.get(`${process.env.REACT_APP_API_URL}/profs/${profId}`, {
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      setProfeData(data)
      setNom(data.nom)
      setPrenom(data.prenom)
      setTel(data.tel)
      setEmail(data.email)
      setAdress(data.adress)
      setInstrument(data.instrument)
      setCv(data.cv)
      setTarif(data.tarif)
      setSolde(data.solde)
    })
    .catch(error => {
      if (error.response) {
        console.error('Error response:', error.response.status, error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Request setup error:', error.message);
      }
    });
  }, []);
  

  const handleSubmit = () => {
    const updatedData = {
      nom: nom,
      prenom: prenom,
      tel: tel,
      email: email,
      adress: adress,
      instrument: instrument,
      tarif:tarif,
      solde:solde,
    };
  
    console.log(updatedData)
  
    axios
      .put(`${process.env.REACT_APP_API_URL}/profs/${profeData.id}`, updatedData, {
      })
      .then(function (response) {
        window.location.href = '/admin/profs';
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  

  return (
    <div className="flex w-[98vw] h-[100vh]">
      <div className="flex flex-col ml-auto">
        <div className="ml-auto">
        <Retour to='/admin/profs'></Retour>
          <div className="w-[100vw] rounded  flex items-center">
            <div className="w-[75%] bg-gray-100 ml-auto mr-auto h-[75%] flex items-center">
              <div className="w-full bg-gray-100 ml-auto mr-auto flex-col items-center">
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
                  <div className=" my-3" >
                    <label htmlFor="" className="w-[75%] flex ml-auto mr-auto my-2" >adresse</label>
                    <input className=" w-[75%] flex ml-auto mr-auto" value={adress} onChange={(e) => setAdress(e.target.value)} type="text" />
                  </div>
                  <div className=" my-3" >
                    <label htmlFor="" className="w-[75%] flex ml-auto mr-auto my-2" >instrument</label>
                    <TextField
                required
                fullWidth
                id=""
                label="Instrument"
                value={instrument}
                onChange={(e) => setInstrument(e.target.value)}
                select
              >
                {Object.values(typesDeCours).map((value, index) => (
                  <MenuItem key={index} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </TextField>
                  </div>
                  <div className=" my-3" >
                  <label htmlFor="" className="w-[75%] flex ml-auto mr-auto my-2" >tarif</label>
                    <input className=" w-[75%] flex ml-auto mr-auto" value={tarif} onChange={(e) => setTarif(e.target.value.replace(',','.'))} type="text" />
                    <p className="text-red-500 text-center border-2 bg-white">Changer le tarif horaire ne change pas le prix pour les anciens cours</p>
                  </div>
                  <div className=" my-3" >
                  <label htmlFor="" className="w-[75%] flex ml-auto mr-auto my-2" >solde</label>
                    <input className=" w-[75%] bg-gray-400 flex ml-auto mr-auto" value={solde} onChange={(e) => setSolde(e.target.value)} type="text" readOnly />
                  </div>
                <div className="my-3 w-[75%] ml-auto mr-auto ">
                  <button onClick={handleSubmit} className="bg-blue-500 p-2 rounded">Update</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateMember;