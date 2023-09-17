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
import Events from "../pages/admin/Events";
import AppNavigate from "../components/App-Navigate";
/*
<Route path="/register" element={<Register />} />
*/
function Myrouter() {
    return (
        <div>
            
            <Routes>
                <Route path="/admin/login" element={ <Loginmemebr />} />
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/password-reset" element={<PasswordReset />} />
                
                <Route path="/famille/create" element={<CreateFammile />} />
                <Route path="/famille/index" element={<ToutFamilles />} />
                <Route path="/famille/:familleId" element={<Famille />} />
                <Route path="/Admin/dashboard" element={<Dashboard />} />
                <Route path="/Admin/calender" element={<Calendar />} />
                <Route path="/prof/AjouterProf" element={<AjouterProf />} />
                <Route path="/publication/AjouterPublication" element={<AjouterPublication />} />
                <Route path="/event/AjouterEvent" element={<AjouterEvent />} />
                <Route path="/prof/Login" element={<LoginProfe />} />
                <Route path="/eleve/Login" element={<LoginProfe />} />
                <Route path="/cours/Index" element={<AfecherLesCours />} />
                <Route path="/addtocoure/:coureId" element={<AddElevToCoure />} />
                <Route path="/member/ShowAllmember" element={<ShowAllmember />} />
                <Route path="/famille/find/:famille_Id" element={<ShowFamill />} />
                <Route path="/publication/ShowAllPub" element={<ShowAllPub />} />
                <Route path="/cours/AjouterCoure" element={<AjouterCoure />} />
                <Route path="/prof/DisplayProfe" element={<DisplayProfe />} />
                <Route path="/member/Dashboard" element={<Membredashbord />} />
                <Route path="/prof/Dashboard" element={<ProfeDashoard />} />
                <Route path="/admin/events" element={<Events />} />
            </Routes>
        </div>
    );
}


export default Myrouter;

