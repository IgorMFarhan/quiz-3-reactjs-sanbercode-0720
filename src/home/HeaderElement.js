import React, {useContext, useState} from "react"
import {Switch, Route, Link} from 'react-router-dom';
import {HeaderContext} from "./HeaderContext"

const HeaderElement = () =>{
    const [darkTheme,setDarkTheme] = useState(HeaderContext);

    return(
        <>
        <header className={`${darkTheme ? "dark":"light"}`}>
        <button className="button-theme" onClick={()=>setDarkTheme(!darkTheme)}>Dark Bar : {`${darkTheme ? "Active":"Non-Active"}`}</button>
            <img id="logo" width="200px" className="logo"/>
            <nav>
                <div className="navbar">
                    <Link to='/tugas11'>Tugas 11</Link>
                    <Link to='/tugas12'>Tugas 12</Link>
                    <Link to='/tugas13'>Tugas 13</Link>
                    <Link to='/tugas14'>Tugas 14</Link>
                    <Link to='/'>Tugas 15</Link>
                </div>
            </nav>
        </header>
        </>
    )
}

export default HeaderElement 