import React, {useContext, useState} from "react"
import {Switch, Route, Link} from 'react-router-dom';
import {HeaderContext} from './HeaderContext'

const Header = () =>{
  const [darkTheme,setDarkTheme] = useState(HeaderContext);
    return(
        <header>
            <img id='logo' width='200px' className='logo'/>
            <nav>
                <div className="navbar">
                    <Link to='/'>Home</Link>
                    <Link to='/about'>About</Link>
                    <Link to='/tugas13'>Tugas 13</Link>
                    <Link to='/tugas14'>Tugas 14</Link>
                    <Link to='/listmovie'>List Movie</Link>
                </div>
            </nav>
        </header>        
    )
  }

  export default Header 