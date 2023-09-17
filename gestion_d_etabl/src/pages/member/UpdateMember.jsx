import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

function UpdateMember() {
  const { idmemebre } = useParams()
  const [memberData, setMemberData] = useState({});
  const [nom, setNom] = useState(memberData.nom);
  const [prenom, setPrenom] = useState(memberData.prenom);
  const [tel, setTel] = useState(memberData.tel);
  const [email, setEmail] = useState(memberData.email);
  const [adresse, setAdresse] = useState(memberData.adresse);
  const [solde, setSold] = useState(memberData.solde);
  const [famille_id, setFamilleId] = useState(memberData.famille_id);
  const [etudient, setEtudient] = useState(memberData.etudient);
  const [type, setType] = useState(memberData.type);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/findmember/${idmemebre}`)
      .then(response => {
        const data = response.data;
        setMemberData(data);
        setNom(data.nom)
        setPrenom(data.prenom);
        setTel(data.tel);
        setEmail(data.email);
        setAdresse(data.adresse);
        setSold(data.solde);
        setFamilleId(data.famille_id);
        setEtudient(data.etudient);
        setType(data.type);
      })
      .catch(error => {
        console.error(error);
      });
  }, [idmemebre]);

  const handleSubmit = () => {
    axios.post(`http://localhost:8000/api/updatemember/${memberData.id}`, {
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
      window.location.href = '/member/profil';
    })
    .catch(function (error) {
      console.log(error);
    });    
  }

  const valuetoke = Cookies.get('token')
  const headers = Cookies.get('headers')

  if (headers !== 2 && !valuetoke) {
    return <Navigate to="/" />;
  }

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
                  <div className=" my-3" hidden>
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
