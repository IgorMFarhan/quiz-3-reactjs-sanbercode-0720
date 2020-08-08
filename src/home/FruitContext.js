import React, { useState, createContext,useEffect } from "react";
import axios from "axios";

export const FruitContext = createContext();

export const FruitProvider = props => {
    const [fruit,setFruit] = useState(null);
    const [selectedId, setSelectedId]  =  useState(0);
    const [inputName, setInputName] = useState("")
    const [inputPrice, setInputPrice] = useState(0)
    const [inputWeight,setInputWeight] = useState(0)
    const [statusForm, setStatusForm]  =  useState("create")


    useEffect( () => {
        if (fruit === null){
          axios.get(`http://backendexample.sanbercloud.com/api/fruits`)
          .then(res => {
            setFruit(res.data.map(el=>{ 
                return {
                    id: el.id, 
                    name: el.name,
                    price: el.price,
                    weight: el.weight
                }
            } ))
          })
        }
      }, [fruit])


    return (
        <FruitContext.Provider value={
          {
            fruitContext: [fruit,setFruit],
            nameContext : [inputName, setInputName],
            priceContext : [inputPrice, setInputPrice],
            weightContext : [inputWeight,setInputWeight],
            formContext : [statusForm, setStatusForm],
            selectIdContext: [selectedId, setSelectedId],
          }}>
            {props.children}
        </FruitContext.Provider>
    );
}; 