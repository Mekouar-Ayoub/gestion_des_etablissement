import React, { useState, useEffect } from 'react';
import { AiOutlineMenu, AiFillCalendar, AiOutlineUser, AiOutlineInsertRowAbove } from "react-icons/ai";
import Aside from "../../components/Aside"
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
Dashoard() {
    const [data, setData] = useState([]);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isSlidOpen, setIsslidOpen] = useState(false);
    const [successMessage,setSuccessMessage] = useState();
    const [id,setId]=useState();
    useEffect(() => {
        axios
            .get('http://localhost:8000/api/families')
            .then(response => {
                const data = response.data.data;
                setData(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    const handelDelete = (id)=>{
        axios
             .delete(`http://localhost:8000/api/families/${id}`)
             .then(()=>{
                setSuccessMessage('famille suprimer');
             })
             .catch((error)=>{
                console.log(error)
             })
    }
    return (
        <div className="bg-gray-100 font-family-karla flex">
            
                <div className="w-full overflow-x-hidden border-t flex flex-col">
                    <main className="w-full flex-grow p-6">
                        <div className="w-full ">
                        <h1 className="text-3xl text-black pb-6">tout les famille</h1>
                            <div className="bg-white overflow-auto">
                                <div className="w-autto mx-6 mb-6">
                                    <div className='flex justify-end'>
                                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-3 justify-end"><Link to={'/famille/create'}>Ajouter</Link></button>
                                    </div>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minHeight: '100%' }} aria-label="customized table">
                                            <TableHead sx={{ bgcolor: 'rgb(30, 136, 229)' }}>
                                                <TableRow>
                                                    <StyledTableCell align="center">id</StyledTableCell>
                                                    <StyledTableCell align="center">nom</StyledTableCell>
                                                    <StyledTableCell align="center">numbers</StyledTableCell>
                                                    <StyledTableCell align="center">actions</StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {data.map((item, index) => (
                                                    <StyledTableRow key={index}>
                                                        <StyledTableCell align="center" component="th" scope="row">
                                                            {item.id}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center" component="th" scope="row">
                                                            {item.nom}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            {item.members.length}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center" >
                                                            <div className='flex justify-center'>
                                                                {/* ----------------------- */}
                                                                <Link to={`/families/${item.id}`} className='px-2'>
                                                                    <svg width="25" height="25" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                                        <path d="M8.5 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8z"></path>
                                                                        <path d="M20 8v6"></path>
                                                                        <path d="M23 11h-6"></path>
                                                                    </svg>
                                                                </Link>
                                                                {/* ----------------------- */}
                                                                <button onClick={()=>handelDelete(item.id)} className='px-2'>
                                                                    <svg width="25" height="25" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M3 6h18"></path>
                                                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                                    </svg>
                                                                </button>
                                                                {/* ----------------------- */}
                                                                <Link to={`#`} className='px-2'>
                                                                    <svg width="25" height="25" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                                    </svg>
                                                                </Link>
                                                                {/* ----------------------- */}
                                                                <Link to={`/famille/find/${item.id}`} className='px-2'>
                                                                    <svg width="30" height="25" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                                        <path d="M12 9a3 3 0 1 0 0 6 3 3 0 1 0 0-6z"></path>
                                                                    </svg>
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
export default Dashoard;
