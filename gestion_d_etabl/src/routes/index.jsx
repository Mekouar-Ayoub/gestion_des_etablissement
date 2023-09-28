import { Route, Routes } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import CreateFammile from "../pages/families/Create";
import ToutFamilles from "../pages/families/Index";
import FamilyDetails from "../pages/families/Show"
import Dashboard from "../pages/admin/Dashboard";
import Calendar from "../pages/admin/Calendar";
import AddMemberToFamily from "../pages/member/AddMemberToFamily"
import AjouterProf from "../pages/profs/AjouterProf";
import DisplayProfe from "../pages/profs/DisplayProfe";
import AjouterPublication from "../pages/publication/AjouterPublication";
import Loginmemebr from "../pages/member/Login";
import LoginProfe from "../pages/profs/Login";
import AfecherLesCours from "../pages/cours/ShowCours";
import AddEleveToCours from "../pages/admin/AddElevToCoure";
import ShowAllmember from "../pages/member/DisplayAllmember";
import ShowAllPub from "../pages/publication/ShowAllPub";
import AjouterCours from "../pages/cours/AjouterCoure"
import Membredashbord from "../pages/member/Dashboard";
import ProfeDashoard from "../pages/profs/Dashboard"
import Events from "../pages/admin/Events";
import AddEvent from "../pages/events/AjouterEvent"
import PasswordResetComp from '../components/PasswordResetComp'
import { CallToAction } from "@mui/icons-material";
import PublicationsHome from "../pages/PublicationsHome";
/*

*/
function Myrouter() {
    return (
        <div>
            
            <Routes>

            <Route path="/" element={<CallToAction />} />


            
                <Route path="/admin/login" element={<Loginmemebr />} />
                <Route path="/prof/login" element={<LoginProfe />} />
                <Route path="/eleve/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/eleve/dashboard" element={<Membredashbord />} />
                <Route path="/prof/dashboard" element={<ProfeDashoard />} />

                <Route path="/publications" element={<PublicationsHome />} />
                <Route path="/password-reset" element={<PasswordResetComp />} />

            
                <Route path="/famillies/create" element={<CreateFammile />} />
                <Route path="/families" element={<ToutFamilles />} />
                <Route path="/famille/find/:famille_Id" element={<FamilyDetails />} />
                
                <Route path="/cours" element={<AfecherLesCours />} />
                <Route path="/cours/add" element={<AjouterCours />} />
                <Route path="/addtocours/:coureId" element={<AddEleveToCours />} />

                <Route path='/families/membres/add' element={<AddMemberToFamily />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/admin/profs/addprof" element={<AjouterProf />} />
                <Route path="/publications/addpublication" element={<AjouterPublication />} />
                <Route path="/event/addevent" element={<AddEvent />} />
                
                <Route path="/eleve/ShowAllmember" element={<ShowAllmember />} />
                
                <Route path="/publications/all" element={<ShowAllPub />} />
                
                <Route path="/prof/displayprof" element={<DisplayProfe />} />
                
                <Route path="/admin/events" element={<Events />} />
            </Routes>
        </div>
    );
}


export default Myrouter;

