import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import axios from "axios";

const EleveSolde = () => {

    const [soldes, setSoldes] = useState([])
    const [eleve, setEleve] = useState()
    const [totalHeures, setTotalHeures] = useState(0);
    const [cours, setCours] = useState([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + '/eleves/' + Cookies.get('eleveId') + '/solde').then(response => {
            console.log(response.data)
            setSoldes(response.data)
        })

        axios.get(process.env.REACT_APP_API_URL + '/eleves/' + Cookies.get('eleveId')).then(response => {
            console.log(response)
            setEleve(response.data)
        })

        //TODO not working
        axios.get(process.env.REACT_APP_API_URL + '/eleves/' + Cookies.get('eleveId') + '/cours').then(response => {


            console.log(response.data.data)
            console.log(response.data.data[0].coure)
            setCours(response.data.data[0].coure)
            let total = 0.0
            response.data.data[0].coure.map((value) => {
                console.log(value)
                value.debut_de_coure.replace(' ', 'T')
                value.debut_de_coure += '.500Z'
                var d = new Date(value.debut_de_coure);
                value.fin_de_coure.replace(' ', 'T')
                value.fin_de_coure += '.500Z'
                var f = new Date(value.fin_de_coure);
                total += (f.getTime() - d.getTime()) / 1000 / 60
            })
            setTotalHeures(total)
        })
    }, [])

    //TODO nombre heures
    return (<>
        <div className="flex">
            <div>
                <h1>Votre solde est de :</h1>
                <p>{eleve && eleve.solde} en DHS</p>
                <p>Total heures effectuées {totalHeures} minutes</p>
            </div>
            <div>
                <h1>Historique</h1>
                {soldes.map((value) => {
                    return <>
                        <h3>Type de mouvement {value.type}</h3>
                        <p>à {value.created_at}</p>
                        {value.cour_id && value.cour_id != -1 && 
                        <>
                            <p>{cours.find(item => item.id === value.cour_id).titre}</p>
                            <p>a duré {value.nombre_heures} pour un prix horaire de : {
                                cours.find(item => item.id === value.cour_id).prix_horaire
                            } </p>
                            <p>pour un prix total de : {value.prix}</p>
                        </>
                        }
                        </>
                        })
                    }
            </div>
    </div>
    </>)
}

export default EleveSolde