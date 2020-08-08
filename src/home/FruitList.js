import React,{useContext,useState} from 'react';
import axios from "axios"
import {FruitContext} from './FruitContext';

const FruitList = () => {
    const { fruitContext,nameContext,priceContext,weightContext,formContext, selectIdContext } = React.useContext(FruitContext);
    const [fruit,setFruit] = fruitContext
    const [selectedId, setSelectedId]  =  selectIdContext
    const [inputName, setInputName] = nameContext
    const [inputPrice, setInputPrice] = priceContext
    const [inputWeight,setInputWeight] = weightContext
    const [statusForm, setStatusForm]  =  formContext

    const handleEdit = (event) => {
        let idFruit = parseInt(event.target.value)
        let selectFruit = fruit.find(el => el.id === idFruit)

        setSelectedId(idFruit)
        setInputName(selectFruit.name === null ? "": selectFruit.name)
        setInputPrice(selectFruit.price === null ? 0: selectFruit.price)
        setInputWeight(selectFruit.weight === null ? 0 : selectFruit.weight)
        setStatusForm("edit")
      }

      const handleDelete = (event) => {
        let idFruit = parseInt(event.target.value)
        let newFruit  = fruit.filter(el => el.id !== idFruit)

        axios.delete(`http://backendexample.sanbercloud.com/api/fruits/${idFruit}`)
        .then(res => {
            console.log(res)
        })
        setFruit([...newFruit])
    }

    return(
        <div className="container-tugas11">
            <h1>Tabel Harga Buah</h1>
            <table className="tugas11">
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>Harga</th>
                        <th>Berat</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>


        {
            fruit !== null && fruit.map((item,index) => {
                return(
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.weight / 1000 } Kg</td>
                        <td className="action-col">
                            <button onClick={handleEdit} value={item.id}>Edit</button>
                            <button onClick={handleDelete} value={item.id}>Delete</button>
                        </td>
                    </tr>
                )
            })
        }
            </tbody>
            </table>
        </div>
    )
}

export default FruitList; 