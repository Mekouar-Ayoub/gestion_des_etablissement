/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { AiOutlineMenu } from "react-icons/ai";
import Aside from "../../components/Aside"
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'flowbite-react';
import Retour from '../../components/Retour';



function FamilyDetails({isModify}) {

  //TODO modify
  const { familyId } = useParams();
  const [familleData, setFamilleData] = useState(null);
  useEffect(() => {
    
    axios
      .get(`${process.env.REACT_APP_API_URL}/families/${familyId}`)
      .then(response => {
        const data = response.data;
        setFamilleData(data);
        console.log(data)
      })
      .catch(error => {
        console.error(error);
      });
  }, [familyId]);

  if (!familleData) {
    return <div>Loading...</div>;
  }

  const showComp = () => {
    return <div className="bg-gray-100 font-family-karla flex">
    <div className="w-full overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6">
        <Retour to={'/admin/familles'} />
        <h1 className="text-3xl text-black pb-6">Vue de la famille : {familleData.nom} </h1>
        <div className="w-full mt-12">
         
          <div className="bg-white overflow-auto">
            <Button>
            <a href={'/admin/families/' + familyId +'/eleve/add'}>Ajouter un Membre</a>
            </Button>

            
            <table className="min-w-full bg-white">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className=" text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                  <th className=" text-left py-3 px-4 uppercase font-semibold text-sm">Last name</th>
                  <th className=" text-left py-3 px-4 uppercase font-semibold text-sm">Type</th>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Phone</th>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {
                  familleData.members.map((item)=>(
                    <tr key={item.id}>
                    <td className="text-left py-3 px-4">{item.prenom}</td>
                    <td className="text-left py-3 px-4">{item.nom}</td>
                    <td className="text-left py-3 px-4">{item.type}</td>
                    <td className="text-left py-3 px-4"><a className="hover:text-blue-500">{item.tel}</a></td>
                    <td className="text-left py-3 px-4"><a className="hover:text-blue-500">{item.email}</a></td>
                    <td className="text-left py-3 px-4 flex">
                      <Link to={"/admin/eleves/"+item.id} state={{isModifying: true}}>
                      <a className="hover:text-blue-500">
                    
                      <img src='/ModifyIcon.svg'></img></a>
                      </Link>
                      <Link to={"/admin/eleves/"+item.id}>
                  
                      <a className="hover:text-blue-500"> 
                      <img src='/Details.svg'></img></a>
                      </Link>
                      </td>
                  </tr>
                  ))
                }
              </tbody>
            </table>
            
          </div>
        </div>
      </main>
    </div>
  </div >
  }
  const ModifyComp = () => {
    return <></>
  }
  return (<>

    {isModify == false ? showComp() : ModifyComp()}
    </>
  );
}
export default FamilyDetails;