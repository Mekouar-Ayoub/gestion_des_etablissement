import React from "react";
import {AiOutlineSolution,AiOutlinePicture,AiOutlineUserSwitch,AiOutlineCalendar, AiOutlineUser ,AiOutlineInsertRowAbove} from "react-icons/ai";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
function Aside() {
    const headers = Cookies.get('headers')

    return (
        <>
            <aside className="relative bg-sidebar h-screen w-64 hidden sm:block shadow-xl">
                {
                 headers === '0' && <div className="p-6">
                    <a className="text-white text-3xl font-semibold uppercase hover:text-gray-300">Admin</a>
                </div>
                }
                { 
                headers === '1' && <div className="p-6">
                    <a className="text-white text-3xl font-semibold uppercase hover:text-gray-300">Profe</a>
                </div>
                }
                {
                 headers === '2' && <div className="p-6">
                    <a className="text-white text-3xl font-semibold uppercase hover:text-gray-300">Member</a>
                </div>
                }
                <nav className="text-white text-base font-semibold pt-3 " >
                    { headers === '0' && <a className="flex items-center active-nav-link text-white py-4 pl-6 nav-item">
                        <AiOutlineUser />
                        <Link to='/Admin/dashboard' >Dashboard</Link>
                    </a>}
                    { headers === '0' && <a className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                        <AiOutlineInsertRowAbove />
                        <Link to='/cours/Index' >Liste des Cours</Link>
                    </a>}
                    { headers === '0' && <a className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                        <AiOutlineCalendar />
                        <Link to="/Admin/calender">Calendrier</Link>
                    </a>}
                    { headers === '0' && <a className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                        <AiOutlineSolution />
                        <Link to='/famille/index' >Gestion des Familles</Link>
                    </a>}
                    { headers === '0' && <a className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                        <AiOutlineSolution />
                        <Link to='/profes/DisplayProfe' >Gestion des Professeurs</Link>
                    </a>}
                    { headers === '0' && <a className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                        <AiOutlineUserSwitch />
                        <Link to='/member/ShowAllmember' >Gestion des éléves</Link>
                    </a>}
                    
                    { headers === '0' && <a className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                        <AiOutlinePicture />
                        <Link to="/publication/ShowAllPub">Gestion des Publications</Link>
                    </a>}

                    { headers === '0' && <a className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                        <AiOutlinePicture />
                        <Link to="/admin/Events">Gestion des Taches</Link>
                    </a>}
                    { headers === '1' && <a className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                        <AiOutlineInsertRowAbove />
                        <Link to='/profes/ListeCoure' >Liste des Cours</Link>
                    </a>}
                </nav>
            </aside>
        </>
    )
}
export default Aside;