/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";

function Retour({to}) {

return (
    <a href={to} className="bg-blue-500 border-2 p-3 text-white">Retour</a>
)
}

export default Retour