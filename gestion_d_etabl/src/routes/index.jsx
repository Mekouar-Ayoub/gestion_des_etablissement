import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CreateFammile from "../pages/famille/Create";
import ToutFamilles from "../pages/famille/Index";
import ShowFamill from "../pages/famille/Show"
import Famille from "../pages/member/AjouterMembre";
import Dashboard from "../pages/admin/Dashoard";
import Calendar from "../pages/admin/Calendar";
import AjouterProf from "../pages/profes/AjouterProf";
import DisplayProfe from "../pages/profes/DisplayProfe";
import AjouterPublication from "../pages/publication/AjouterPublication";
import AjouterEvent from "../pages/Event/AjouterEvent";
import Loginmemebr from "../pages/member/Login";
import LoginProfe from "../pages/profes/Login";
import AfecherLesCours from "../pages/cours/AfecherLesCours";
import AddElevToCoure from "../pages/admin/AddElevToCoure";
import ShowAllmember from "../pages/member/DisplayAllmember";
import ShowAllPub from "../pages/publication/ShowAllPub";
import AjouterCoure from "../pages/cours/AjouterCoure"
import Membredashbord from "../pages/member/Dashboard";
import ProfeDashoard from "../pages/profes/Dashboard"

function Myrouter() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/famille/create" element={<CreateFammile />} />
                <Route path="/famille/index" element={<ToutFamilles />} />
                <Route path="/famille/:familleId" element={<Famille />} />
                <Route path="/Admin/dashboard" element={<Dashboard />} />
                <Route path="/Admin/calender" element={<Calendar />} />
                <Route path="/profes/AjouterProf" element={<AjouterProf />} />
                <Route path="/publication/AjouterPublication" element={<AjouterPublication />} />
                <Route path="/Event/AjouterEvent" element={<AjouterEvent />} />
                <Route path="/member/Login" element={<Loginmemebr />} />
                <Route path="/profes/Login" element={<LoginProfe />} />
                <Route path="/cours/Index" element={<AfecherLesCours />} />
                <Route path="/addtocoure/:coureId" element={<AddElevToCoure />} />
                <Route path="/member/ShowAllmember" element={<ShowAllmember />} />
                <Route path="/famille/find/:famille_Id" element={<ShowFamill />} />
                <Route path="/publication/ShowAllPub" element={<ShowAllPub />} />
                <Route path="/cours/AjouterCoure" element={<AjouterCoure />} />
                <Route path="/profes/DisplayProfe" element={<DisplayProfe />} />
                <Route path="/member/Dashboard" element={<Membredashbord />} />
                <Route path="/profes/Dashboard" element={<ProfeDashoard />} />
            </Routes>
        </div>
    );
}


export default Myrouter;
