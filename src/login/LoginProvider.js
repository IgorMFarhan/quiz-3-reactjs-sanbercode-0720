import React, {useState} from "react";
import LoginContext from './LoginContext'

const LoginProvider = ({ children }) => {
    const [status, setStatus] = useState(false)
    const [movies, setMovies] = useState(null)

    return (
      <LoginContext.Provider value={{status, setStatus, movies, setMovies}}>
        {children}
      </LoginContext.Provider>
    )
  }
  
export default LoginProvider