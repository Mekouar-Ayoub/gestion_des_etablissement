/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";

function Retour({to}) {

return (
    <a href={to} className="bg-blue-500 border-2 p-3 text-center text-white mb-[1%] w-[10%]">Retour</a>
)
}

export default Retour