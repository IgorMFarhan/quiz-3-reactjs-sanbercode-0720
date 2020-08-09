import React, { useState, createContext } from "react";

export const HeaderContext = createContext();

export const HeaderProvider = props => {
    const [darkTheme,setDarkTheme] = useState(false);


    return (<HeaderContext.Provider value={[darkTheme, setDarkTheme]}>
        {props.children}
      </HeaderContext.Provider>);
}; 