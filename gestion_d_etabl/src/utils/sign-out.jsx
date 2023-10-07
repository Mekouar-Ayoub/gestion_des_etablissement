import Cookies from "js-cookie"

export const signOut = () => {
    Cookies.set('token','')
    Cookies.set('headers','')
    Cookies.set('eleveId','')
    Cookies.set('profId','')
    window.location.href='/'
}