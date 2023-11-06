import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Aside from "../../components/Aside"
import { FormLabel, Input, Button } from '@mui/material';
import axios from "axios";
import Retour from "../../components/Retour";
import { useParams } from "react-router-dom";

function ModifyPublication() {

  //TODO handle mutliple images
  const [image, setImage] = useState('');
  const [vedeo, setVedeo] = useState('');
  const [description, setDescription] = useState('');
  const { publicationId } = useParams()

  useEffect(()=> {
    publicationId
    axios.get(process.env.REACT_APP_API_URL+'/publications/'+publicationId).then((response) => {
      console.log(response)
      setImage(response.data.image)
      setVedeo(response.data.vedeo)
      setDescription(response.data.description)
    }
      
    )
  })
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    setVedeo(e.target.files[0]);
  };

  //TODO gerer soit images soit video
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('vedeo', vedeo);
    formData.append('description', description);

    axios
      .put(process.env.REACT_APP_API_URL+'/publications', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('Publication added successfully');
        window.location.href = '/publications';
      })
      .catch((error) => {
        console.log('Error during submission:', error);
      });
  };
  return (
    <div className="bg-gray-100 font-family-karla flex">
      
        <div className="w-full overflow-x-hidden border-t flex flex-col">
        <Retour to='/publications'></Retour>
          <main className="w-full flex-grow p-6">
          
            <h1 className="text-3xl text-black pb-6">Dashboard</h1>
            <div className="w-full">
              <div className="bg-white overflow-auto">
                <div>
                  <form className="max-w-xl ml-auto mr-auto border rounded p-4 my-6" onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">image</label>
                      <input type="file" id="nom" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  onChange={handleImageChange}  required />
                      <img src=''></img>
                    </div>
                    <div className="mb-6">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">vedeo</label>
                      <input type="file" onChange={handleVideoChange} id="nom" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div className="mb-6">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">description</label>
                      <input type="text"  value={description} onChange={(e) => setDescription(e.target.value)} id="nom" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <button type="button" onClick={handleSubmit} className="text-white bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div >
  );
}
export default ModifyPublication;