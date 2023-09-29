import Myrouter from "./routes";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Aside from "./components/Aside";
import { CallToAction } from "@mui/icons-material";
function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
    const [isSlidOpen, setIsslidOpen] = useState(false)
    const location = useLocation()
    useEffect(()=> {
      //console.log(location.pathname)
    }, [])
  return (<>
  { location.pathname != '/' ? <>
    <header className="w-full items-center bg-[#3d68ff] py-2 px-6 hidden sm:flex">
                    <div className="w-1/2"></div>
                    <div className="relative w-1/2 flex justify-end">
                        <button onClick={() => setIsslidOpen(!isSlidOpen)} className="realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none">
                            <img src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400" />
                        </button>
                        {isSlidOpen && (
                            <div className="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16">
                                <a href="#" className="block px-4 py-2 account-link hover:text-white"><Link to="/admin/Profil">Profil</Link></a>
                                <a href="#" className="block px-4 py-2 account-link hover:text-white">Support</a>
                                <a href="#" className="block px-4 py-2 account-link hover:text-white">Sign Out</a>
                            </div>
                        )}
                    </div>
                    
                </header>
        

    <div className="bg-gray-100 font-family-karla flex">
            
            <Aside >
            
            </Aside>
            <Myrouter />
    </div>
    </> : <Myrouter></Myrouter>
  
    
  }
  </>
  )
}

export default App;