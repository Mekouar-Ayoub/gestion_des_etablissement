import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Aside from "../../components/Aside"

function Dashoard() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isSlidOpen, setIsslidOpen] = useState(false)
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
                        <h1 className="text-3xl text-black pb-6">MembreDashboard</h1>
                        <div className="w-full mt-12">
                            <p className="text-xl pb-3 flex items-center">
                                <i className="fas fa-list mr-3"></i> Latest Reports
                            </p>
                            <div className="bg-white overflow-auto">
                                <table className="min-w-full bg-white">
                                    <thead className="bg-gray-800 text-white">
                                        <tr>
                                            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                                            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Last name</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Phone</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-700">
                                        <tr>
                                            <td className="w-1/3 text-left py-3 px-4">Lian</td>
                                            <td className="w-1/3 text-left py-3 px-4">Smith</td>
                                            <td className="text-left py-3 px-4"><a className="hover:text-blue-500" href="tel:622322662">622322662</a></td>
                                            <td className="text-left py-3 px-4"><a className="hover:text-blue-500" href="mailto:jonsmith@mail.com">jonsmith@mail.com</a></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </main>
                </div>
            </div >
        </div>
    );
}
export default Dashoard;