import React, { useState } from 'react';
import axios from 'axios';
import { Navbar } from 'flowbite-react';

function CallToAction() {


    return (
        <>
        <Link>
        <a href='/profs'>Professeur </a>
        </Link>
        <Link>
        <a href='/eleve'>Eleve</a>
        </Link>
        </>

    )
}


export default CallToAction;