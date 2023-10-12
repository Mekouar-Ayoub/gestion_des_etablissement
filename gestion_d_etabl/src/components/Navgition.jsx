import React,{useState} from "react";
import { AiOutlineMenu} from "react-icons/ai";
import { Link } from "react-router-dom";

function Navgation() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isSlidOpen, setIsslidOpen] = useState(false)
    return (
        <div>
            <header className="w-full items-center bg-[#3d68ff] py-2 px-6 hidden sm:flex">
                <div className="w-1/2">ecole</div>
                <div className="relative w-1/2 flex justify-end">
                    <button onClick={() => setIsslidOpen(!isSlidOpen)} className="realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none">
                        <img src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400" />
                    </button>
                    {isSlidOpen && (
                        <div className="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16">
                            <a href="#" className="block px-4 py-2 account-link hover:text-white"><Link to={'/admin/calendar'}>calendar</Link></a>
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
        </div>
    )
}

export default Navgation;