import React from "react";
import {AiOutlineSolution,AiOutlinePicture,AiOutlineUserSwitch,AiOutlineCalendar, AiOutlineUser ,AiOutlineInsertRowAbove} from "react-icons/ai";
import { Link } from "react-router-dom";
function ProfeNavbar() {
    return (
        <>
            <aside className="relative bg-sidebar h-screen w-64 hidden sm:block shadow-xl">
                <div className="p-6">
                    <a className="text-white text-3xl font-semibold uppercase hover:text-gray-300">Admin</a>
                    <button className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
                        <i className="fas fa-plus mr-3"></i> New Report
                    </button>
                </div>
                <nav className="text-white text-base font-semibold pt-3 " >
                    <a className="flex items-center active-nav-link text-white py-4 pl-6 nav-item">
                        <AiOutlineUser />
                        <Link to='/Admin/dashboard' >Dashboard</Link>
                    </a>
                    <a className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                        <AiOutlineInsertRowAbove />
                        <Link to='/cours/Index' >Cours</Link>
                    </a>
                    <a className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                        <AiOutlineSolution />
                        <Link to='/famille/index' >familles</Link>
                    </a>
                    <a className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                        <AiOutlineSolution />
                        <Link to='/profes/DisplayProfe' >Profes</Link>
                    </a>
                    <a className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">

                        <AiOutlineUserSwitch />
                        <Link to='/member/ShowAllmember' >membres</Link>
                    </a>
                    <a className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                        <AiOutlineCalendar />
                        <Link to="/Admin/calender">Calendar</Link>
                    </a>
                    <a className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                        <AiOutlinePicture />
                        <Link to="/publication/ShowAllPub">publications</Link>
                    </a>
                </nav>
            </aside>
        </>
    )
}
export default ProfeNavbar;