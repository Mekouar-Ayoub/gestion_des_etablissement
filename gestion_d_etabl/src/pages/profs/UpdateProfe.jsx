import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from 'js-cookie';
function UpdateMember() {
  const { idprofe } = useParams()
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
    const token = Cookies.get('token');
    
    axios.get(`http://localhost:8000/api/profs/${idprofe}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      setProfeData(data)
      setNom(data[0].nom)
      setPrenom(data[0].prenom)
      setTel(data[0].tel)
      setEmail(data[0].email)
      setAdress(data[0].adress)
      setInstrument(data[0].instrument)
      setCv(data[0].cv)
      setTarif(data[0].tarif)
      setSolde(data[0].solde)
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
  }, [idprofe]);
  

  const handleSubmit = () => {
    const updatedData = {
      nom: nom,
      prenom: prenom,
      tel: tel,
      email: email,
      adress: adress,
      instrument: instrument,
      cv: cv,
      tarif:tarif,
      solde:solde,
    };
  
    console.log(updatedData)
    const token = Cookies.get('token');
  
    axios
      .post(`http://localhost:8000/api/updateProfe/${profeData[0].id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        window.location.href = '/profes/Profil';
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  

  return (
    <div className="flex w-[98vw] h-[100vh]">
      <div className="flex flex-col ml-auto">
        <div className="ml-auto">
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
                    <input className=" w-[75%] flex ml-auto mr-auto" value={instrument} onChange={(e) => setInstrument(e.target.value)} type="text" />
                  </div>
                  <div className=" my-3" >
                    <label htmlFor="" className="w-[75%] flex ml-auto mr-auto my-2" >cv</label>
                    <input className=" w-[75%] flex ml-auto mr-auto" value={cv} onChange={(e) => setCv(e.target.value)} type="text" />
                  </div>
                  <div className=" my-3" >
                    <input className=" w-[75%] flex ml-auto mr-auto" value={tarif} onChange={(e) => setTarif(e.target.value)} type="text" hidden/>
                  </div>
                  <div className=" my-3" >
                    <input className=" w-[75%] flex ml-auto mr-auto" value={solde} onChange={(e) => setSolde(e.target.value)} type="text" hidden/>
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