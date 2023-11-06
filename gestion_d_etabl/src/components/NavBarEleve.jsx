import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "../utils/sign-out";
import { isPlatform } from "@ionic/react";

const NavBarEleve = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSlidOpen, setIsslidOpen] = useState(false);
  const [isMobile, setisMobile] = useState(!isPlatform("desktop"));
  const [eleve, setEleve] = useState({});
  useEffect(() => {
    const getMe = async () => {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/eleves/" + Cookies.get("eleveId")
      );
      setEleve(response.data);
      console.log(window.location.href);
    };
    getMe();
  }, []);

  return (
    <>
      {isMobile ? (
        <>
        <header className="w-full items-center py-2 px-3 border-b-2 flex overflow-disable ">
          <img
            className=""
            src="/images/BlueIcon.svg"
            width={35}
            height={35}
          ></img>
          <div className="justify-between flex mt-[3%] ml-[5%] mr-[5%]">
            <Link
              className=" student-border-selection "
              to="/eleve/dashboard"
            >
              <button className=" ">
                <img
                  src={
                    window.location.href.endsWith("/eleve/dashboard")
                      ? "/images/Fil.svg"
                      : "/images/FilGray.svg"
                  }
                ></img>
                <p
                  className={
                    window.location.href.endsWith("/eleve/dashboard")
                      ? "student-primary  border-b-2 text-xs"
                      : " text-stone-400 text-xs"
                  }
                >
                  Fil
                </p>
              </button>
            </Link>
            <Link className="mt-[-3%]" to="/eleve/calendar">
              <button className="">
                <img
                className="ml-[-7%]"
                  src={
                    window.location.href.endsWith("/eleve/calendar")
                      ? "/images/Calendar.svg"
                      : "/images/CalendarGray.svg"
                  }
                ></img>
                <p
                  className={
                    window.location.href.endsWith("/eleve/calendar")
                      ? "student-primary border-b-2 text-xs w-[5%] mt-[-6%]"
                      : " text-stone-400 text-xs w-[5%] mt-[-6%]"
                  }
                >
                  Emploi
                </p>
              </button>
            </Link>
            <Link className="" to="/eleve/solde">
              <button className="">
                <img
                  src={
                    window.location.href.endsWith("/eleve/solde")
                      ? "/images/Solde.svg"
                      : "/images/SoldeGray.svg"
                  }
                ></img>
                <p
                  className={
                    window.location.href.endsWith("/eleve/solde")
                      ? "student-primary text-xs  border-b-2"
                      : " text-stone-400 text-xs"
                  }
                >
                  Solde
                </p>
              </button>
            </Link>
            <Link className="" to="/eleve/profil">
              <button className="">
                <img
                  src={
                    window.location.href.endsWith("/eleve/profil")
                      ? "/images/Profile.svg"
                      : "/images/ProfileGray.svg"
                  }
                ></img>
                <p
                  className={
                    window.location.href.endsWith("/eleve/profil")
                      ? "student-primary text-xs border-b-2"
                      : " text-stone-400 text-xs"
                  }
                >
                  Profil
                </p>
              </button>
            </Link>
          </div>
          <div className="relative flex justify-end w-[30%]">
            <button onClick={() => setIsslidOpen(!isSlidOpen)} className="flex">
              <img className="mt-[15%]" src="/images/ArrowDown.svg"></img>
              <div className="realtive z-10 w-12 h-12 rounded-lg border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none">
                <img src="/images/Profile.svg" className="mt-[12%] ml-[8%]" />
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
        </header></>
      ) : (
        <header className="w-full items-center py-2 px-6 border-b-2 flex overflow-disable">
          <img
            className="ml-[5%] mt-[3%] mb-[3%]"
            src="/images/BlueIcon.svg"
            width={70}
            height={70}
          ></img>
          <div className="justify-between w-[100%] flex mt-[2%] ml-[15%]">
            <Link
              className="mr-[5%] pb-[2%] student-border-selection w-[30%]"
              to="/eleve/dashboard"
            >
              <button className="flex w-[200%]">
                <img
                  src={
                    window.location.href.endsWith("/eleve/dashboard")
                      ? "/images/Fil.svg"
                      : "/images/FilGray.svg"
                  }
                ></img>{" "}
                <span
                  className={
                    window.location.href.endsWith("/eleve/dashboard")
                      ? "student-primary ml-[5%] border-b-2"
                      : "ml-[5%] text-stone-400"
                  }
                >
                  Fil d'actualité
                </span>
              </button>
            </Link>
            <Link className="mr-[15%] " to="/eleve/calendar">
              <button className="flex w-[200%]">
                <img
                className="mt-[-5%]"
                  src={
                    window.location.href.endsWith("/eleve/calendar")
                      ? "/images/Calendar.svg"
                      : "/images/CalendarGray.svg"
                  }
                ></img>
                <span
                  className={
                    window.location.href.endsWith("/eleve/calendar")
                      ? "student-primary ml-[5%] border-b-2"
                      : "ml-[5%]  text-stone-400"
                  }
                >
                  Emploi du temps
                </span>
              </button>
            </Link>
            <Link className="mr-[15%]" to="/eleve/solde">
              <button className="flex w-[200%]">
                <img
                className="mt-[-4%]"
                  src={
                    window.location.href.endsWith("/eleve/solde")
                      ? "/images/Solde.svg"
                      : "/images/SoldeGray.svg"
                  }
                ></img>
                <span
                  className={
                    window.location.href.endsWith("/eleve/solde")
                      ? "student-primary ml-[5%] border-b-2"
                      : "ml-[5%] text-stone-400"
                  }
                >
                  Solde
                </span>
              </button>
            </Link>
            <Link className="mr-[15%]" to="/eleve/profil">
              <button className="flex w-[200%]">
                <img
                  src={
                    window.location.href.endsWith("/eleve/profil")
                      ? "/images/Profile.svg"
                      : "/images/ProfileGray.svg"
                  }
                ></img>
                <span
                  className={
                    window.location.href.endsWith("/eleve/profil")
                      ? "student-primary ml-[5%] border-b-2"
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
              <div className="realtive z-10 w-12 h-12 rounded-lg border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none">
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
      )}
    </>
  );
};

export default NavBarEleve;

/*

 <a
              href="#"
              className=" px-4 py-2 account-link hover:text-white hidden"
            >
              Account
            </a>
            <a
              href="/support"
              className=" px-4 py-2 account-link hover:text-white hidden"
            >
              Support
            </a>

            */
