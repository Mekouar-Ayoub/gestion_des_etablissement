import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiFillCalendar, AiOutlineUser, AiOutlineInsertRowAbove } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import { AiFillPlusSquare } from "react-icons/ai";
import Aside from "../../components/Aside";

function index() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isSlidOpen, setIsslidOpen] = useState(false)
    const [data, setData] = useState([]);
    useEffect(() => {
        axios
            .get('http://localhost:8000/api/toutlascoure')
            .then(response => {
                const data = response.data.data;
                setData(data);
            })
    })
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
                        <h1 className="text-3xl text-black pb-6">Dashboard</h1>
                        <div className="w-full mt-12">
                            <p className="text-xl pb-3 flex items-center">
                                <i className="fas fa-list mr-3"></i> Latest Reports
                            </p>
                            <div className="bg-white overflow-auto">
                            <div className='flex justify-end'>
                                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-3 justify-end"><Link to={'/cours/AjouterCoure'}>Ajouter un coure</Link></button>
                                    </div>
                                <table className="min-w-full bg-white">
                                    <thead className="bg-[#3d68ff] text-white">
                                        <tr>
                                            <th className="text-left py-3 uppercase font-semibold text-sm">titre</th>
                                            <th className="text-left py-3 uppercase font-semibold text-sm">prix horaire</th>
                                            <th className="text-left py-3 uppercase font-semibold text-sm">etat</th>
                                            <th className="text-left py-3 uppercase font-semibold text-sm">debut de coure</th>
                                            <th className="text-left py-3 uppercase font-semibold text-sm">fin de coure</th>
                                            <th className="text-left py-3 uppercase font-semibold text-sm">profe</th>
                                            <th className="text-left py-3 uppercase font-semibold text-sm">action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-700">
                                        {
                                            data.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="text-left py-3">{item.titre}</td>
                                                    <td className="text-left py-3">{item.prix_horaire}</td>
                                                    <td className="text-left py-3"><a className="hover:text-blue-500" href="tel:622322662">{item.etat}</a></td>
                                                    <td className="text-left py-3"><a className="hover:text-blue-500">{item.debut_de_coure}</a></td>
                                                    <td className="text-left py-3"><a className="hover:text-blue-500">{item.fin_de_coure}</a></td>
                                                    <td className="text-left py-3"><a className="hover:text-blue-500">{item.profe.nom}</a></td>
                                                    <td className="text-left py-3"><a className="hover:text-blue-500"><Link to={`/addtocoure/${item.id}`}><svg width="25" height="25" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                                                        <path d="M12 8v8"></path>
                                                        <path d="M8 12h8"></path>
                                                    </svg></Link></a></td>
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
        </div>
    )
}

export default index;