import React, {useContext, useState} from "react"
import {Link,useHistory} from 'react-router-dom';
import LoginContext from '../login/LoginContext'

const Header = () =>{
  const {status, setStatus} = useContext(LoginContext)
    const history = useHistory()

    const handleLogout = () => {
        setStatus(false)
        history.push("/")
    }
    return(
        <header>
            <img id='logo' width='200px' className='logo'/>
            <nav>
                <div className="navbar">
                    <Link to='/'>Home</Link>
                    <Link to='/about'>About</Link>
                    {status ?
                    <>
                    <Link to='/listmovie'>List Movie</Link>
                    <Link className='log' onClick={handleLogout}>Logout</Link>  
                    </>
                    :
                    <Link to='/login'>Login</Link>
                    }
                </div>
            </nav>
        </header>        
    )
  }

  export default Header 