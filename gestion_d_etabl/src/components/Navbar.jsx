import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const [show, setShow] = useState(false);
    return (
        <div>
            <nav className="mx-auto block w-full max-w-screen-xl rounded-xl border border-white/80 bg-white bg-opacity-80 py-2 px-4 text-white shadow-md backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
                <div>
                    <div className="container mx-auto flex items-center justify-between text-gray-900 w-full">
                        <Link to="/" className="mr-4 block py-1.5 font-sans text-sm font-normal leading-normal text-inherit antialiased">
                            <span>ecole music</span>
                        </Link>
                        <ul className="hidden items-center gap-6 lg:flex">
                            {sessionStorage.token && (
                                <li
                                    id="Rout1"
                                    className="block p-1 font-sans text-sm font-normal leading-normal text-inherit antialiased"
                                >
                                    <Link to="/" className="flex items-center">
                                        Home
                                    </Link>
                                </li>
                            )}
                            {
                                sessionStorage.token && (<li id="Rout2" className="block p-1 font-sans text-sm font-normal leading-normal text-inherit antialiased">
                                    <Link to="/famille/Create" className="flex items-center">CreateFamille</Link>
                                </li>)
                            }
                            {
                                sessionStorage.token && (<li id="Rout4" className="block p-1 font-sans text-sm font-normal leading-normal text-inherit antialiased">
                                    <Link to="/famille/index" className="flex items-center">famille</Link>
                                </li>)
                            }
                            {
                                sessionStorage && (<li id="Rout4" className="block p-1 font-sans text-sm font-normal leading-normal text-inherit antialiased">
                                    <Link to="/Admin/dashboard" className="flex items-center">dashboard</Link>
                                </li>)
                            }

                        </ul>
                        <div>
                            <button className="middle mx-2 none center hidden rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block" type="button" data-ripple-light="true">
                                <span><Link to="/Login" className="flex items-center">Login</Link></span>
                            </button>
                            <button className="middle mx-2 none center hidden rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block" type="button" data-ripple-light="true">
                                <span><Link to="/Register" className="flex items-center">Register</Link></span>
                            </button>
                        </div>
                        {
                            show ? <button onClick={() => setShow(false)} className="middle none relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] rounded-lg text-center font-sans text-xs font-medium uppercase text-blue-gray-500 transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden">
                                <svg width="30" height="30" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 6 6 18"></path>
                                    <path d="m6 6 12 12"></path>
                                </svg>
                            </button> : <button onClick={() => setShow(true)} className="middle none relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] rounded-lg text-center font-sans text-xs font-medium uppercase text-blue-gray-500 transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden" data-collapse-target="navbar">
                                <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transform">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" ></path>
                                    </svg>
                                </span>
                            </button>
                        }
                    </div>
                    <div className="block h-0 w-full basis-full text-blue-gray-900 transition-all duration-300 ease-in lg:hidden" data-collapse="navbar" >
                        {
                            show ? <div className="container mx-auto pb-2 bg-slate-900 ">
                                <ul className="mt-2 mb-4 flex flex-col gap-2">
                                    <li className="block p-1 font-sans text-sm font-normal leading-normal text-inherit antialiased">
                                        {
                                            sessionStorage.token && (
                                                <Link to="/" className="flex items-center">
                                                    Home
                                                </Link>
                                            )
                                        }
                                    </li>
                                    <li className="block p-1 font-sans text-sm font-normal leading-normal text-inherit antialiased">
                                        {
                                            sessionStorage.token && (
                                                <Link to="/famille/Create" className="flex items-center">CreateFamille</Link>
                                            )
                                        }
                                    </li>
                                    <li className="block p-1 font-sans text-sm font-normal leading-normal text-inherit antialiased">
                                        {
                                            sessionStorage.token && (
                                                <Link to="/member/AjouterMembre" className="flex items-center">AjouterMembre</Link>
                                            )
                                        }
                                    </li>
                                </ul>
                                <button
                                    className="middle text-center none center mb-2 block w-full rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button"
                                    data-ripple-light="true"
                                >
                                    <span className="text-center"><Link to="/login" className="flex items-center">login</Link></span>
                                </button>
                                <button
                                    className="middle text-center none center mb-2 block w-full rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button"
                                    data-ripple-light="true"
                                >
                                    <span className="text-center"><Link to="/Register" className="flex items-center">Register</Link></span>
                                </button>
                            </div> : null
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;

