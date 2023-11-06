import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchBar from '../../components/SearchBar';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));




function 
AllFamilies() {
    const [data, setData] = useState([]);

    const [successMessage,setSuccessMessage] = useState();

    useEffect(() => {
        axios
            .get(process.env.REACT_APP_API_URL+'/families')
            .then(response => {
                console.log(response)
                const data = response.data;
                setData(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    /*const handelDelete = (id)=>{
        axios
             .delete(`${process.env.REACT_APP_API_URL}/families/${id}`)
             .then(()=>{
                setSuccessMessage('famille suprimer');
             })
             .catch((error)=>{
                console.log(error)
             })
    }*/
    return (
        <div className="bg-gray-100 font-family-karla flex">
            
                <div className="w-full overflow-x-hidden border-t flex flex-col">
                    <main className="w-full flex-grow p-6">
                        
                        <div className="w-full ">
                        <h1 className="text-3xl text-black pb-6">tout les famille</h1>
                            <div className="bg-white overflow-auto">
                                <div className="w-autto mx-6 mb-6">
                                    <div className='flex justify-end'>
                                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-3 justify-end">
                                            <Link to={'/admin/families/create'}>Ajouter une famille</Link></button>
                                    </div>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minHeight: '100%' }} aria-label="customized table">
                                            <TableHead sx={{ bgcolor: 'rgb(30, 136, 229)' }}>
                                                <TableRow>
                                                    
                                                    <StyledTableCell align="center">Nom</StyledTableCell>
                                                    <StyledTableCell align="center">Nombre de membres</StyledTableCell>
                                                    <StyledTableCell align="center">Actions</StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {data.map((item, index) => (
                                                    <StyledTableRow key={index}>
                                                        
                                                        <StyledTableCell align="center" component="th" scope="row">
                                                            {item.nom}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            {item.members.length}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center" >
                                                            <div className='flex justify-center'>
                                                               
                                                                <Link to={"/admin/families/"+ item.id +"/eleve/add"} params={{familyId: item.id}} className='px-2'>
                                                                <img src='/images/AddMember.svg'></img>
                                                                </Link>
                                                                
                                                                <Link to={`/admin/families/find/${item.id}/modify`} params={{ familyId: item.id}} className='px-2'>
                                                                    <img src='/images/ModifyIcon.svg'></img>
                                                                </Link>
                                                                
                                                                <Link  to={`/admin/families/find/${item.id}`} params={{familyId: item.id }} className='px-2'>
                                                                <img src='/images/Details.svg'></img>
                                                                </Link>
                                                            </div>
                                                        </StyledTableCell>
                                                    </StyledTableRow>
                                                ))}

                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div >
    );
}
export default AllFamilies;

/*

<button onClick={()=>handelDelete(item.id)} className='px-2'>
                                                                    <svg width="25" height="25" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M3 6h18"></path>
                                                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                                    </svg>
                                                                </button>*/