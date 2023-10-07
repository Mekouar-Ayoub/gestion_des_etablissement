import React from "react";
import {
  AiOutlineSolution,
  AiOutlinePicture,
  AiOutlineUserSwitch,
  AiOutlineCalendar,
  AiOutlineUser,
  AiOutlineInsertRowAbove,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
function Aside() {
  const headers = Cookies.get("headers");

  return (
    <>
      <aside className="relative bg-sidebar h-screen w-[25%] sm:block shadow-xl">
        {headers === "0" && (
          <div className="p-6">
            <h1 className="text-white text-3xl font-semibold uppercase hover:text-gray-300">
              Admin
            </h1>
          </div>
        )}
        {headers === "1" && (
          <div className="p-6">
            <h1 className="text-white text-3xl font-semibold uppercase hover:text-gray-300">
              Prof
            </h1>
          </div>
        )}
        {headers === "2" && (
          <div className="p-6">
            <h1 className="text-white text-3xl font-semibold uppercase hover:text-gray-300">
              Member
            </h1>
          </div>
        )}
        <nav className="text-white text-base font-semibold pt-3 ">
          {headers === "0" && (
            <Link to="/admin/dashboard">
            <a className="flex items-center active-nav-link text-white py-4 pl-6 nav-item">
              <AiOutlineUser />
              Dashboard
            </a></Link>
          )}
          {headers === "0" && (
            <Link to="/admin/cours">
            <a className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
              <AiOutlineInsertRowAbove />
              Liste des Cours
            </a>
            </Link>
          )}
          {headers === "0" && (
            <Link to="/admin/calendar">
            <a className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
              <AiOutlineCalendar />
              Calendrier
            </a>
            </Link>
          )}
          {headers === "0" && (
            <Link to="/admin/families/">
            <a className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
              <AiOutlineSolution />
              Gestion des Familles
            </a>
            </Link>
          )}
          {headers === "0" && (
            <Link to="/admin/profs">
            <a className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
              <AiOutlineSolution />
              Gestion des Professeurs
            </a>
            </Link>
          )}
          {headers === "0" && (
            <Link to="/admin/eleves">
            <a className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
              <AiOutlineUserSwitch />
              Gestion des éléves
            </a>
            </Link>
          )}

          {headers === "0" && (
            <Link to="/admin/publications">
            <a className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
              <AiOutlinePicture />
              Gestion des Publications
            </a>
            </Link>
          )}

          {headers === "0" && (
             <Link to="/admin/events">
            <a className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
              <AiOutlinePicture />
              Gestion des Taches
            </a>
            </Link>
          )}
          {headers === "1" && (
            <Link to="/profs/listecours">
            <a className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
              <AiOutlineInsertRowAbove />
              Liste des Cours
            </a>
            </Link>
          )}
        </nav>
      </aside>
    </>
  );
}
export default Aside;
