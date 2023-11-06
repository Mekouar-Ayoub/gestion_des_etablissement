import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "../utils/sign-out";
import { isPlatform } from "@ionic/react";

const NavBarProf = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSlidOpen, setIsslidOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(!isPlatform("desktop"));
  const [prof, setProf] = useState({});
  useEffect(() => {
    const getMe = async () => {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/profs/" + Cookies.get("profId")
      );
      console.log(response);
      setProf(response.data);
    };
    getMe();
  }, []);

  return (
    <>
      {!isMobile ? (
        <header className="w-full items-center py-2 px-6 border-b-2 flex overflow-disable">
          <img
            className="ml-[3%] mt-[3%] mb-[3%]"
            src="/images/BlueIcon.svg"
            width={70}
            height={70}
          ></img>
          <div className="justify-between w-[100%] flex mt-[2%] ml-[5%]">
            <Link
              className="mr-[5%] pb-[2%] student-border-selection w-[30%]"
              to="/prof/dashboard"
            >
              <button className="flex w-[200%]">
                <img
                  src={
                    window.location.href.endsWith("/prof/dashboard")
                      ? "/images/FilProf.svg"
                      : "/images/FilGray.svg"
                  }
                ></img>{" "}
                <span
                  className={
                    window.location.href.endsWith("/prof/dashboard")
                      ? "prof-primary ml-[5%] border-b-2"
                      : "ml-[5%] text-stone-400"
                  }
                >
                  Fil d'actualité
                </span>
              </button>
            </Link>
            <Link className="mr-[15%] " to="/prof/calendar">
              <button className="flex w-[200%]">
                <img
                  src={
                    window.location.href.endsWith("/prof/calendar")
                      ? "/images/CalendarProf.svg"
                      : "/images/CalendarGray.svg"
                  }
                ></img>
                <span
                  className={
                    window.location.href.endsWith("/prof/calendar")
                      ? "prof-primary ml-[2%] border-b-2"
                      : "ml-[2%] text-stone-400"
                  }
                >
                  Emploi du temps
                </span>
              </button>
            </Link>
            <Link className="mr-[15%]" to="/prof/solde">
              <button className="flex w-[200%]">
                <img
                  src={
                    window.location.href.endsWith("/prof/solde")
                      ? "/images/SoldeProf.svg"
                      : "/images/SoldeGray.svg"
                  }
                ></img>
                <span
                  className={
                    window.location.href.endsWith("/prof/solde")
                      ? "prof-primary ml-[5%] border-b-2"
                      : "ml-[5%] text-stone-400"
                  }
                >
                  Solde
                </span>
              </button>
            </Link>
            <Link className="mr-[15%]" to="/prof/profil">
              <button className="flex w-[200%]">
                <img
                  src={
                    window.location.href.endsWith("/prof/profil")
                      ? "/images/ProfileProf.svg"
                      : "/images/ProfileGray.svg"
                  }
                ></img>
                <span
                  className={
                    window.location.href.endsWith("/prof/profil")
                      ? "prof-primary ml-[5%] border-b-2"
                      : "ml-[5%] text-stone-400"
                  }
                >
                  Profil
                </span>
              </button>
            </Link>
          </div>
          <div className="relative flex justify-end w-[25%]">
            <button onClick={() => setIsslidOpen(!isSlidOpen)} className="flex">
              <img className="mt-[15%]" src="/images/ArrowDown.svg"></img>
              <div className="realtive z-10 w-12 h-12 rounded-lg  border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none">
                <img src="/images/Profile.svg" className="mt-[10%] ml-[17%]" />
              </div>
            </button>
            {isSlidOpen && (
              <div className="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16">
                <a
                  onClick={() => {
                    signOut();
                  }}
                  className="block px-4 py-2 account-link hover:text-white"
                >
                  Se deconnecter
                </a>
              </div>
            )}
          </div>
        </header>
      ) : (
        <header className="w-full items-center py-1 px-4 border-b-2 flex overflow-disable">
          <img
            className="ml-[0%] mt-[2%] mb-[0%]"
            src="/images/BlueIcon.svg"
            width={35}
            height={35}
          ></img>
          <div className="w-[100%] flex justify-between mt-[2%] ml-[5%] mr-[2%]">
            <Link
              className="mr-[0%] pb-[2%] student-border-selection"
              to="/prof/dashboard"
            >
              <button className="w-[100%]">
                <img
                  className="ml-[2%] mt-[10%] "
                  src={
                    window.location.href.endsWith("/prof/dashboard")
                      ? "/images/FilProf.svg"
                      : "/images/FilGray.svg"
                  }
                ></img>
                <p
                  className={
                    window.location.href.endsWith("/prof/dashboard")
                      ? "prof-primary ml-[0%] border-b-2 text-xs"
                      : "ml-[0%] text-stone-400 text-xs"
                  }
                >
                  Fil
                </p>
              </button>
            </Link>
            <Link className="mr-[0%] mt-[-1%] " to="/prof/calendar">
              <button className="w-[100%]">
                <img
                  className="ml-[0%]"
                  src={
                    window.location.href.endsWith("/prof/calendar")
                      ? "/images/CalendarProf.svg"
                      : "/images/CalendarGray.svg"
                  }
                ></img>
                <p

                  className={
                    window.location.href.endsWith("/prof/calendar")
                      ? "prof-primary ml-[0%] border-b-2 text-xs mt-[-12%]"
                      : "ml-[0%] text-stone-400 text-xs mt-[-12%]"
                  }
                >
                  Emploi
                </p>
              </button>
            </Link>
            <Link className="mr-[0%]" to="/prof/solde">
              <button className="w-[100%]">
                <img
                  className="ml-[0%]"
                  src={
                    window.location.href.endsWith("/prof/solde")
                      ? "/images/SoldeProf.svg"
                      : "/images/SoldeGray.svg"
                  }
                ></img>
                <p
                  className={
                    window.location.href.endsWith("/prof/solde")
                      ? "prof-primary ml-[0%] border-b-2 text-xs mt-[7%]"
                      : "ml-[0%] text-stone-400 text-xs mt-[7%]"
                  }
                >
                  Solde
                </p>
              </button>
            </Link>
            <Link className="mr-[0%]" to="/prof/profil">
              <button className="w-[100%]">
                <img
                  className="ml-[0%]"
                  src={
                    window.location.href.endsWith("/prof/profil")
                      ? "/images/ProfileProf.svg"
                      : "/images/ProfileGray.svg"
                  }
                ></img>
                <p
                  className={
                    window.location.href.endsWith("/prof/profil")
                      ? "prof-primary ml-[0%] border-b-2 text-xs mt-[10%]"
                      : "ml-[0%] text-stone-400 text-xs mt-[10%]"
                  }
                >
                  Profil
                </p>
              </button>
            </Link>
          </div>
          <div className="relative flex justify-end w-[30%] mr-[-3%]">
            <button onClick={() => setIsslidOpen(!isSlidOpen)} className="flex">
              <img className="mt-[15%]" src="/images/ArrowDown.svg"></img>
              <div className="realtive z-10 w-12 h-12 rounded-lg  border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none">
                <img src="/images/Profile.svg" className="mt-[10%] ml-[10%]" />
              </div>
            </button>
            {isSlidOpen && (
              <div className="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16">
                <a
                  onClick={() => {
                    signOut();
                  }}
                  className="block px-4 py-2 account-link hover:text-white"
                >
                  Se deconnecter
                </a>
              </div>
            )}
          </div>
        </header>
      )}
    </>
  );
};

export default NavBarProf;
