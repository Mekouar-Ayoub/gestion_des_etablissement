import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import "./CallToAction.css";
import Cookies from "js-cookie";
function CallToAction() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    if (Cookies.get("token")) {
      if (Cookies.get("headers") === "0") {
        window.location.href = "/admin/calendar";
      }
      if (Cookies.get("headers") === "1") {
        window.location.href = "/prof/dashboard";
      }
      if (Cookies.get("headers") === "2") {
        window.location.href = "/eleve/dashboard";
      }
    }
    setOk(true)
  }, []);
  return (<>
    {ok &&  
    <main className="flex">
      <div className="w-[25%] ml-[5%] mt-[10%]">
        <img
          src="/images/logo_blue_symphony.svg"
          className="w-96 mt-[25%]"
        ></img>
      </div>
      <div className="w-[75%] ml-[20%] mt-[0%]">
        <h1 className="mt-[20%] mb-[5%] ml-[0%] text-xl"> Vous êtes ?</h1>
        <div className=" text-white">
          <div className="flex w-[100%]">
            <Link to={"/prof/login"} className="call-div">
              <div className="prof-background p-5 hover:bg-sky-700">
                <a>Professeur</a>
              </div>
            </Link>

            <Link to={"/eleve/login"} className="call-div ml-[5%] student-background p-5 hover:bg-sky-700">
              <div className="">
                <a>Eleve ou Famille</a>
              </div>
            </Link>
          </div>
          <div className="flex w-[100%]">
            <Link to={"/admin/login"} className="admin-background p-5 hover:bg-sky-700" >
              <div className="">
                <a>Admin</a>
              </div>
            </Link>
            <Link to={"/publications/all"} className="ml-[5%] bg-orange-300 p-5 hover:bg-sky-700">
              <div>
                <a>Visiteur</a>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>}
    </>
  );
}

export default CallToAction;
