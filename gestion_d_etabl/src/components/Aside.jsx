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
            <a className="text-white text-3xl font-semibold uppercase hover:text-gray-300">
              Admin
            </a>
          </div>
        )}
        {headers === "1" && (
          <div className="p-6">
            <a className="text-white text-3xl font-semibold uppercase hover:text-gray-300">
              Profe
            </a>
          </div>
        )}
        {headers === "2" && (
          <div className="p-6">
            <a className="text-white text-3xl font-semibold uppercase hover:text-gray-300">
              Member
            </a>
          </div>
        )}
        <nav className="text-white text-base font-semibold pt-3 ">
          {headers === "0" && (
            <a className="flex items-center active-nav-link text-white py-4 pl-6 nav-item">
              <AiOutlineUser />
              <Link to="/admin/dashboard">Dashboard</Link>
            </a>
          )}
          {headers === "0" && (
            <a className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
              <AiOutlineInsertRowAbove />
              <Link to="/cours">Liste des Cours</Link>
            </a>
          )}
          {headers === "0" && (
            <a className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
              <AiOutlineCalendar />
              <Link to="/calendar">Calendrier</Link>
            </a>
          )}
          {headers === "0" && (
            <a className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
              <AiOutlineSolution />
              <Link to="/families/">Gestion des Familles</Link>
            </a>
          )}
          {headers === "0" && (
            <a className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
              <AiOutlineSolution />
              <Link to="/profs">Gestion des Professeurs</Link>
            </a>
          )}
          {headers === "0" && (
            <a className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
              <AiOutlineUserSwitch />
              <Link to="/admin/eleves/showalleleves">Gestion des éléves</Link>
            </a>
          )}

          {headers === "0" && (
            <a className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
              <AiOutlinePicture />
              <Link to="/publications/all">Gestion des Publications</Link>
            </a>
          )}

          {headers === "0" && (
            <a className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
              <AiOutlinePicture />
              <Link to="/admin/events">Gestion des Taches</Link>
            </a>
          )}
          {headers === "1" && (
            <a className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
              <AiOutlineInsertRowAbove />
              <Link to="/profes/listecours">Liste des Cours</Link>
            </a>
          )}
        </nav>
      </aside>
    </>
  );
}
export default Aside;
