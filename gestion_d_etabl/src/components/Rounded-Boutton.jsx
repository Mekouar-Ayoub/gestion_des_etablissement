import React, {useState} from "react";


const RoundedButton = ({text,type,className}) => {
    

    return(<>
        {type === 'student' && <button className={"border-2 rounded-xl student-background pt-3 pb-3 pl-16 pr-16 text-white text-center " +className}>{text}</button>}
        {!type && <button className={"rounded-xl pt-3 pb-3 pl-16 pr-16 text-center " + className}>{text}</button>}
        {type === 'prof' && <button className={"border-2 rounded-xl prof-background pt-3 pb-3 pl-16 pr-16 text-white text-center " +className}>{text}</button>}
        {type =='login' && <button className={"rounded-lg text-lg pt-4 pb-4 pl-20 pr-20 drop-shadow-md text-center " + className}>{text}</button>}</>
    )
}

export default RoundedButton