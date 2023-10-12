import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiFillCalendar, AiOutlineUser, AiOutlineInsertRowAbove } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import Aside from "../../components/Aside";
import { TransformEtat } from "../../utils/common-objects"

function index({ user }) {
    const [data, setData] = useState([]);
    const [dataToShow, setDataToShow] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [individuel, setIndividuel] = useState('');

    useEffect(() => {
        axios
            .get(process.env.REACT_APP_API_URL + '/cours')
            .then(response => {
                console.log(response.data)
                setData(response.data.data)
                setDataToShow(response.data.data)
                setIndividuel(response.data.individuel === 1 ? 'Individuel': response.data.individuel === 1 ? 'Groupe' : '')
            })


    }, [])

    const handleSearchInput = (e) => {
        if(e.target.value === '') {
            setDataToShow(data);
        }
        
        let searchText= e.target.value.toLowerCase()
        console.log(searchText)
        setSearchInput(searchText)
        let newDataToShow = []
        if(searchText.match(/^((?:19|20)\d\d)[- /.](0[1-9]|1[012])?[- /.]?(0[1-9]|[12][0-9]|3[01])?$/)){
            data.map(item => {
                if(item.debut_de_coure.includes(searchText) || item.fin_de_coure.includes(searchText)) {
                    newDataToShow.push(item)
                }
            })
            setDataToShow(newDataToShow)
        } else {
           let found = false;
            data.map(item => {
                item.membres.map(value => {
                    if(value.nom.toLowerCase().includes(searchText) || value.prenom.toLowerCase().includes(searchText)){
                        newDataToShow.push(item) 
                        found= true;
                    }
                })

                if(item.profe.nom.toLowerCase().includes(searchText) || item.profe.nom.toLowerCase().includes(searchText)) {
                    newDataToShow.push(item)
                    found= true;
                } 
                if(found === false){
                    item.titre.toLowerCase().includes(searchText) && newDataToShow.push(item)
                }
            })

            

            //TODO search prof + titre + eleves
            setDataToShow(newDataToShow)
        } 
    }



    //TODO add cours ajouter nom prof pas que prenom
    return (
        <>
            <div className="w-full overflow-x-hidden border-t flex flex-col">
                <main className="w-full flex-grow p-6">
                    <h1 className="text-3xl text-black pb-6">Liste des cours</h1>
                    <button className="text-white bg-[#3788d8] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-3 justify-end"
                    ><Link to="/calendar">Vue Calendrier</Link></button>
                    <button className="text-white bg-[#3788d8] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-3 justify-end">
                        {user === 'admin' ? 
                        <Link to={'/admin/cours/add'}>
                            <a>Ajouter un cours</a>
                            </Link> : 
                            <></>}
                    </button>
                    <br />
                    <div>
                    <button onClick={()=> {
                        setIndividuel(1)
                        setDataToShow(dataToShow.filter(value => value.individuel === 1))
                    }}
                        className={individuel === '1' ? 'bg-blue-500 text-white p-3' : 'bg-white border-2 p-3'}>Individuel</button>
                        <button onClick={()=> {
                        setIndividuel(0)
                        setDataToShow(dataToShow.filter(value => value.individuel === 0))
                    }} className={individuel === 1 ? 'bg-blue-500 text-white p-3' : 'bg-white border-2 p-3'}>Groupe</button>
                        {individuel !='' && <button readOnly={individuel === ''} className='bg-red-500 text-white p-3' onClick={()=> {
                            setDataToShow(data)
                            setIndividuel(-1);
                        }}>Vider le filtre</button>}
                        <br />
                        <input value={searchInput} onChange={handleSearchInput}  className="border-2 mb-[2%]"></input>
                  <label>Chercher par Date(YYYY-MM-JJ) Professeur eleve ou instrument</label>
                    
                    </div>
                    <div className="w-full">
                        <div className="bg-white overflow-auto w-full">
                            <div className='flex justify-end'>

                            </div>
                            <table className="w-full bg-white">
                                <thead className="">
                                    <tr className="w-full">
                                        <th className="text-left py-3 uppercase font-semibold text-sm">Cours de </th>
                                        <th className="text-left py-3 uppercase font-semibold text-sm">Etat du cours</th>
                                        <th className="text-left py-3 uppercase font-semibold text-sm">Debut du cours</th>
                                        <th className="text-left py-3 uppercase font-semibold text-sm">Fin du cours</th>
                                        <th className="text-left py-3 uppercase font-semibold text-sm">Type de cours</th>
                                        <th className="text-left py-3 uppercase font-semibold text-sm">Professeur</th>
                                        <th className="text-left py-3 uppercase font-semibold text-sm">Eleves</th>
                                        <th className="text-left py-3 uppercase font-semibold text-sm">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700">
                                    {
                                        dataToShow.map((item, index) => (
                                            <tr key={index}>
                                                <td className="text-left py-3">{item.titre}</td>
                                                <td className="text-left py-3"><span className="hover:text-blue-500">{TransformEtat(item.etat)}</span></td>
                                                <td className="text-left py-3"><span className="hover:text-blue-500">{item.debut_de_coure}</span></td>
                                                <td className="text-left py-3"><span className="hover:text-blue-500">{item.individuel === 1 ? 'Individuel' : 'Groupe'}</span></td>
                                                <td className="text-left py-3"><span className="hover:text-blue-500">{item.fin_de_coure}</span></td>
                                                <td className="text-left py-3"><span className="hover:text-blue-500">{item.profe.nom}</span></td>
                                                <td className="text-left py-3"><span className="hover:text-blue-500">{item.membres.map((value) => {
                                                    return value.nom + ' ' + value.prenom + ' ,'
                                                })}</span></td>
                                                <td className="text-left py-3 flex">
                                                    <Link to={`/admin/cours/${item.id}`}><a className="hover:text-blue-500">
                                                        <img src="/AddMember.svg" />
                                                    </a></Link>
                                                    <Link to={`/admin/cours/${item.id}`}><a className="hover:text-blue-500">
                                                        <img src='/ModifyIcon.svg' /></a>
                                                    </Link>
                                                    {item.etat == 2 &&
                                                    <button className="" onClick={() => {
                                                        console.log(item)
                                                        
                                                            let newCours = item
                                                            item.etat = 1
                                                            newCours.etat = 1
                                                            console.log(newCours)
                                                            axios
                                                                .put(process.env.REACT_APP_API_URL + '/cours/' + item.id, newCours).catch(error => {
                                                                    console.error(error)
                                                                })
                                                            window.location.href = '/admin/cours'
                                                        
                                                    }}>
                                                         <img src='/CancelIcon.svg' className="" /></button>}

                                                         {(item.etat == 0 || item.etat == 1) &&
                                                    <button className="" onClick={() => {
                                                        
                                                            console.log(item)
                                                            let newCours = item
                                                            item.etat = 2
                                                            newCours.etat = 2
                                                            console.log(newCours)
                                                            axios
                                                                .put(process.env.REACT_APP_API_URL + '/cours/' + item.id, newCours).catch(error => {
                                                                    console.error(error)
                                                                })
                                                            window.location.href = '/admin/cours'
                                                        

                                                    }}>
                                                        <img src='/ValidIcon.svg' /></button>}

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



        </>
    )
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