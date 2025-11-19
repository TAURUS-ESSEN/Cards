import { useState } from "react";
export default function Menu({setDifficulty}) {
    return (
        <div className="border flex flex-col gap-2 p-4 ">
            menu.jsx
            <button onClick={()=>setDifficulty(6)} className="hover:scale-105">easy</button>
            <button onClick={()=>setDifficulty(8)} className="hover:scale-105">medim</button>
            <button onClick={()=>setDifficulty(10)} className="hover:scale-105">hard</button>
        </div>
    )
}