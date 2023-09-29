import React, { useState } from 'react';
import axios from 'axios';
import { Navbar } from 'flowbite-react';
import { Link } from 'react-router-dom';
import './CallToAction.css'
function CallToAction() {


    return (
        <main className='flex'>
            <div className='w-[25%] ml-[5%] mt-[10%]'>
                <img src='/images/logo_blue_symphony.jpg' className='w-96 mt-[25%]'></img>
            </div>
            <div className='w-[75%] ml-[35%] mt-[10%]'>
                <h1 className='mt-[10%] mb-[5%] ml-[0%] text-xl'> Vous êtes ?</h1>
                <div className='call-div prof-background prof-primary p-5'>
                    <Link to={'/profs/login'}>
                        <a>Professeur</a>
                    </Link>
                </div>

                <div className='call-div student-background student-primary p-5'>
                    <Link to={'/eleve/login'}>
                        <a>Eleve</a>
                    </Link>
                </div>

                <div className='call-div admin-background admin-primary p-5'>
                    <Link to={'/admin/login'}>
                        <a>Admin</a>
                    </Link>
                </div>

            </div>
        </main>
    )
}


export default CallToAction;