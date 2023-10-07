import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar } from 'flowbite-react';
import { Link } from 'react-router-dom';
import './CallToAction.css'
import Cookies from 'js-cookie';
function CallToAction() {

             useEffect(()=> {
    if(Cookies.get('token')){
        if(Cookies.get('headers')=== '0'){
            window.location.href = '/admin/dashboard'
        }
        if(Cookies.get('headers')=== '1'){
            window.location.href = '/prof/dashboard'
        }
        if(Cookies.get('headers')=== '2'){
            window.location.href = '/eleve/dashboard'
        }
    }
                },[])
    return (
        <main className='flex'>
            <div className='w-[25%] ml-[5%] mt-[10%]'>
                <img src='/images/logo_blue_symphony.svg' className='w-96 mt-[25%]'></img>
            </div>
            <div className='w-[75%] ml-[20%] mt-[0%]'>
                <h1 className='mt-[10%] mb-[5%] ml-[0%] text-xl'> Vous êtes ?</h1>
                <div className=' text-white'>
                <div className='call-div prof-background p-5 hover:bg-sky-700'>
                    <Link to={'/profs/login'}>
                        <a>Professeur</a>
                    </Link>
                </div>

                <div className='call-div student-background p-5 hover:bg-sky-700'>
                    <Link to={'/eleve/login'}>
                        <a>Eleve</a>
                    </Link>
                </div>

                <div className='call-div admin-background p-5 hover:bg-sky-700'>
                    <Link to={'/admin/login'}>
                        <a>Admin</a>
                    </Link>
                </div>

                <div className='call-div admin-background p-5 hover:bg-sky-700'>
                    <Link to={'/publications/all'}>
                        <a>Visiteur</a>
                    </Link>
                </div>
                
                </div>
            </div>
        </main>
    )
}


export default CallToAction;