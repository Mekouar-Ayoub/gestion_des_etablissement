import Myrouter from "./routes";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Aside from "./components/Aside";
import { CallToAction } from "@mui/icons-material";
import Cookies from "js-cookie";
import axios from "axios";
import NavBarEleve from "./components/NavBarEleve";
import UserAside from "./components/AsideUser";
import { signOut } from "./utils/sign-out";

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSlidOpen, setIsslidOpen] = useState(false)
  const location = useLocation()
  useEffect(() => {
    //console.log(location.pathname)
  }, [])


  //TODO remove
  const handleLogOut = () => {
    if (Cookies.get('token') && Cookies.get('headers') === '0') {
      axios.post(process.env.REACT_APP_API_URL + '/admin/logout')
      window.location.href = '/'
      Cookies.remove("token")
      Cookies.remove("headers")
    }
    if (Cookies.get('token') && Cookies.get('headers') === '1') {
      axios.post(process.env.REACT_APP_API_URL + '/prof/logout')
      window.location.href = '/'
      Cookies.remove("token")
      Cookies.remove("headers")
    }
    if (Cookies.get('token') && Cookies.get('headers') === '2') {
      axios.post(process.env.REACT_APP_API_URL + '/eleve/logout')
      window.location.href = '/'
      Cookies.remove("token")
      Cookies.remove("headers")
    }
  }



  const lateralAdmin= ()=> {
    return <>
    <header className="w-full items-center bg-[#3d68ff] py-2 px-6 hidden sm:flex">
      <div className="w-1/2"></div>
      <div className="relative w-1/2 flex justify-end">
        <button onClick={() => setIsslidOpen(!isSlidOpen)} className="realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none">
          <img src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400" />
        </button>
        {isSlidOpen && (
          <div className="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16">
            <button className="block px-4 py-2 account-link hover:text-white"
              onClick={handleProfilButton}>
              Profil
            </button>
            <a href="/support" className="block px-4 py-2 account-link hover:text-white">Support</a>
            <button className="block px-4 py-2 account-link hover:text-white"
              onClick={()=>{
                signOut()
            }} 
            >Sign Out</button>
          </div>
        )}
      </div>

    </header>


    <div className="bg-gray-100 font-family-karla flex">

      <Aside >

      </Aside>
      <Myrouter />
    </div>
  </> 
  }

  const handleProfilButton = () => {

    //TODO change
    if (Cookies.get('token') && Cookies.headers === 0) {
      window.location.href = '/admin/me'
    }
    if (Cookies.get('token') && Cookies.headers === 1) {
      window.location.href = '/prof/me'
    }
    if (Cookies.get('token') && Cookies.headers === 2) {
      window.location.href = '/eleve/me'
    }
  }
  return (<>
    {location.pathname.startsWith('/admin') && location.pathname != '/'  && !location.pathname.endsWith('login') ? lateralAdmin()
      : location.pathname.startsWith('/eleve') && !location.pathname.includes('login') ? <>
      <NavBarEleve></NavBarEleve> 
      <Myrouter></Myrouter>
      </>
      :<Myrouter></Myrouter>
    }

  </>

  )
}

export default App;