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
            .get('http://localhost:8000/api/toulFamille')
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
             .post(`http://localhost:8000/api/DeleteFamille/${id}`)
             .then(()=>{
                setSuccessMessage('famille suprimer');
             })
             .catch((error)=>{
                console.log(error)
             })
    }
    return (
        <div className="bg-gray-100 font-family-karla flex">
            <Aside />
            <div className="w-full flex flex-col h-screen overflow-y-hidden">
                <header className="w-full items-center bg-[#3d68ff] py-2 px-6 hidden sm:flex">
                    <div className="w-1/2"></div>
                    <div className="relative w-1/2 flex justify-end">
                        <button onClick={() => setIsslidOpen(!isSlidOpen)} className="realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none">
                            <img src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400" />
                        </button>
                        {isSlidOpen && (
                            <div className="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16">
                                <a href="#" className="block px-4 py-2 account-link hover:text-white">Account</a>
                                <a href="#" className="block px-4 py-2 account-link hover:text-white">Support</a>
                                <a href="#" className="block px-4 py-2 account-link hover:text-white">Sign Out</a>
                            </div>
                        )}
                    </div>
                </header>
                <header className="w-full bg-sidebar py-5 px-6 sm:hidden">
                    <div className="flex items-center justify-between">
                        <a href="index.html" className="text-white text-3xl font-semibold uppercase hover:text-gray-300">Admin</a>
                        <button className="text-white text-3xl focus:outline-none">
                            <AiOutlineMenu onClick={() => setIsNavOpen(!isNavOpen)} />
                        </button>
                    </div>
                    {isNavOpen && (<nav className="flex flex-col pt-4">
                        <a href="index.html" className="flex items-center active-nav-link text-white py-2 pl-4 nav-item">
                            <i className="fas fa-tachometer-alt mr-3"></i>
                            Dashboard
                        </a>
                        <a href="blank.html" className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                            <i className="fas fa-sticky-note mr-3"></i>
                            Blank Page
                        </a>
                        <a href="tables.html" className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                            <i className="fas fa-table mr-3"></i>
                            Tables
                        </a>
                        <a href="forms.html" className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                            <i className="fas fa-align-left mr-3"></i>
                            Forms
                        </a>
                        <a href="tabs.html" className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                            <i className="fas fa-tablet-alt mr-3"></i>
                            Tabbed Content
                        </a>
                        <a href="calendar.html" className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                            <i className="fas fa-calendar mr-3"></i>
                            Calendar
                        </a>
                        <a href="#" className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                            <i className="fas fa-cogs mr-3"></i>
                            Support
                        </a>
                        <a href="#" className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                            <i className="fas fa-user mr-3"></i>
                            My Account
                        </a>
                        <a href="#" className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                            <i className="fas fa-sign-out-alt mr-3"></i>
                            Sign Out
                        </a>
                        <button className="w-full bg-white cta-btn font-semibold py-2 mt-3 rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
                            <i className="fas fa-arrow-circle-up mr-3"></i> Upgrade to Pro!
                        </button>
                        < button className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center" >
                            <i className="fas fa-plus mr-3"></i> New Report
                        </button >
                    </nav>
                    )}
                </header >
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
                                                                <Link to={`/famille/${item.id}`} className='px-2'>
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
        </div>
    );
}
export default Dashoard;
