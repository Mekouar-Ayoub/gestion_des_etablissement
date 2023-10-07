import { Route, Routes } from "react-router-dom";

import Login from "../pages/eleves/Login";
import Register from "../pages/Register";
import CreateFammile from "../pages/families/Create";
import ToutFamilles from "../pages/families/Show";
import FamilyDetails from "../pages/families/ShowOneFamily"
import Dashboard from "../pages/admin/Dashboard";
import Calendar from "../pages/admin/Calendar";
import AddMemberToFamily from "../pages/eleves/AddMemberToFamily"
import AjouterProf from "../pages/profs/AjouterProf";
import DisplayProfe from "../pages/profs/DisplayProfe";
import AjouterPublication from "../pages/publication/AjouterPublication";
import Loginmemebr from "../pages/admin/Login";
import LoginProfe from "../pages/profs/Login";
import AfecherLesCours from "../pages/cours/ShowCours";
import AddEleveToCours from "../pages/admin/AddElevToCoure";
import ShowAllmember from "../pages/eleves/DisplayAllmember";
import ShowAllPub from "../pages/publication/ShowAllPub";
import AjouterCours from "../pages/cours/AjouterCoure"
import ProfeDashoard from "../pages/profs/Dashboard"
import Events from "../pages/admin/Events";
import AddEvent from "../pages/events/AjouterEvent"
import CallToAction from "../pages/CallToAction";
import PublicationsHome from "../pages/PublicationsHome";
import ShowProf from "../pages/profs/ShowOneProf";
import ProtectedRoute from "./ProtectedRoute";
import UpdateMember from "../pages/eleves/UpdateMember";
import UpdateProf from "../pages/profs/UpdateProfe"
import AdminProfile from "../pages/admin/AdminProfile";
import ProfProfile from "../pages/profs/ProfProfile";
import EleveProfile from "../pages/eleves/EleveProfile";
import ModifyPublication from "../pages/publication/ModifyPublication";
import LoginAdmin from "../pages/admin/Login";
import LoginEleve from "../pages/eleves/Login";
import EleveDashboard from "../pages/eleves/Dashboard";
/*

*/
function Myrouter() {
    return (
        <>

            <Routes>
                    <Route element={<ProtectedRoute user={'admin'} />}>

                        <Route path="/admin/dashboard" element={<Dashboard />} />
                        <Route path="/admin/calendar" element={<Calendar type='admin' />} />
                        <Route path="/admin/families/create" element={<CreateFammile />} />
                        <Route path="/admin/families" element={<ToutFamilles />} />
                        <Route path="/admin/families/find/:familyId" element={<FamilyDetails isModify={false}/>} />
                        <Route path="/admin/families/find/:familyId/modify" element={<FamilyDetails isModify={true}/>} />
                        <Route path='/admin/families/:familyId/eleve/add' element={<AddMemberToFamily />} />

                        <Route path="/admin/cours/add" element={<AjouterCours />} />
                        <Route path="/admin/cours/:courId" element={<AddEleveToCours />} />

                        <Route path="/admin/profs/add" element={<AjouterProf />} />
                        <Route path="/admin/profs" element={<DisplayProfe />} />
                        <Route path="/admin/profs/:profId/modify" element={<UpdateProf />} />
                        <Route path="/admin/profs/:profId/" element={<ShowProf />} />
                        
                        
                        <Route path="/admin/publications/addpublication" element={<AjouterPublication  />} />
                        <Route path="/admin/publications/:publicationId/modify" element={<ModifyPublication />} />
                        <Route path="/admin/eleves/" element={<ShowAllmember />} />
                        <Route path="/admin/eleves/:eleveId/modify" element={<UpdateMember isModifying={true} />} />
                        <Route path="/admin/eleves/:eleveId" element={<UpdateMember isModifying={false} />} />

                        <Route path="/admin/events" element={<Events />} />
                        <Route path="/admin/events/add" element={<AddEvent />} />

                        <Route path="/admin/publications" element={<ShowAllPub />} />
                        <Route path="/admin/cours" element={<AfecherLesCours user='admin' />} />
                        <Route path='/admin/me' element={AdminProfile} />
                    </Route>

                    <Route element={<ProtectedRoute user={'prof'} />}>

                        <Route path="/prof/cours" element={<AfecherLesCours user='admin' />} />
                        <Route path="/prof/dashboard" element={<ProfeDashoard />} />
                        <Route path='/prof/me' element={ProfProfile} />
                    </Route>

                    <Route element={<ProtectedRoute user={'eleve'} />}>
                        <Route path="/eleve/cours/" element={<AfecherLesCours user='admin' />} />
                        <Route path="/eleve/dashboard" element={<EleveDashboard />} />
                        <Route path="/eleve/family/find/:famille_Id" element={<FamilyDetails />} />
                        <Route path='/eleve/me' element={EleveProfile} />
                    </Route>
                    <Route element={<ProtectedRoute user={'all'} />}>
                        
                        
                        <Route path="/publications" element={<PublicationsHome />} />
                    </Route>
                    
                    <Route path="/register" element={<Register />} />
                    <Route path="/eleve/calendar" element={<Calendar type='eleve' />} />
                    <Route path="/prof/calendar" element={<Calendar type='prof' />} />
                <Route path="/" element={<CallToAction />} />
                <Route path="/admin/login" element={<LoginAdmin />} />
                <Route path="/prof/login" element={<LoginProfe />} />
                <Route path="/eleve/login" element={<LoginEleve />} />
                
            </Routes>
        </>
    );
}


export default Myrouter;

