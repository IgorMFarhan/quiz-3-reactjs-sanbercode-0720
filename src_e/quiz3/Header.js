import React from 'react'
import {HeaderProvider} from './HeaderContext'
import HeaderElement from './HeaderElement'

const Header = () =>{
    return(
      <HeaderProvider>
        <HeaderElement/>
      </HeaderProvider>
    )
  }

  export default Header 