import React, { useState, useEffect } from 'react';
import { AiOutlineMenu } from "react-icons/ai";
import Aside from "../../components/Aside"
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'flowbite-react';


function FamilyDetails() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSlidOpen, setIsslidOpen] = useState(false)
  const { famille_Id } = useParams();
  const [familleData, setFamilleData] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/families/${famille_Id}`)
      .then(response => {
        const data = response.data;
        setFamilleData(data);

      })
      .catch(error => {
        console.error(error);
      });
  }, [famille_Id]);

  if (!familleData) {
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-gray-100 font-family-karla flex">
        <div className="w-full overflow-x-hidden border-t flex flex-col">
          <main className="w-full flex-grow p-6">
            <h1 className="text-3xl text-black pb-6">Vue de la famille : {familleData.nom} </h1>
            <div className="w-full mt-12">
             
              <div className="bg-white overflow-auto">
                <Button>
                <a href='/AjouterMembre'>Ajouter un Membre</a>
                </Button>

                <Link>
                <a href=''></a>
                </Link>
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className=" text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                      <th className=" text-left py-3 px-4 uppercase font-semibold text-sm">Last name</th>
                      <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Phone</th>
                      <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {
                      familleData.members.map((item)=>(
                        <tr key={item.id}>
                        <td className="text-left py-3 px-4">{item.nom}</td>
                        <td className="text-left py-3 px-4">{item.type}</td>
                        <td className="text-left py-3 px-4"><a className="hover:text-blue-500">{item.tel}</a></td>
                        <td className="text-left py-3 px-4"><a className="hover:text-blue-500">{item.email}</a></td>
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
  );
}
export default FamilyDetails;