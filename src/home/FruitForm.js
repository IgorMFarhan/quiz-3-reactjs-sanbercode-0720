import React from "react";
import axios from "axios"
import {FruitContext} from './FruitContext';

const FruitForm = () => {
    const { fruitContext,nameContext,priceContext,weightContext,formContext, selectIdContext } = React.useContext(FruitContext);
    const [fruit,setFruit] = fruitContext
    const [selectedId, setSelectedId]  =  selectIdContext
    const [inputName, setInputName] = nameContext
    const [inputPrice, setInputPrice] = priceContext
    const [inputWeight,setInputWeight] = weightContext
    const [statusForm, setStatusForm]  =  formContext


    const handleSubmit = (event) => {
        event.preventDefault()
        let name = inputName
        let price = parseInt(inputPrice)
        let weight = parseInt(inputWeight)


        if (name.replace(/\s/g,'') === '') {
            return
        }

        if (statusForm === 'create') {
            axios.post(`http://backendexample.sanbercloud.com/api/fruits`,{name,price,weight})
            .then(res => {
                setFruit([...fruit,{id: res.data.id,name: res.data.name,price: res.data.price,weight: res.data.weight}])
            }).catch(error => {
                console.log(error)
            })
        } else {
            axios.put(`http://backendexample.sanbercloud.com/api/fruits/${selectedId}`,{name,price,weight})
            .then(res => {
                let selectFruit = fruit.find(el => el.id === selectedId)
                selectFruit.name = name
                selectFruit.price = price
                selectFruit.weight = weight
                setFruit([...fruit])

            }).catch(error => {
                console.log(error)
            })
        }

        setStatusForm("create")
        setSelectedId(0)
        setInputName("")
        setInputPrice(0)
        setInputWeight(0)

      }

      const handleChange = (event) => {
        let typeOfInput = event.target.name
        switch (typeOfInput) {
          case "name":
              setInputName(event.target.value)
              break;
          case "weight":
              setInputWeight(event.target.value)
              break;
          case "price":
              setInputPrice(event.target.value)
              break;
          default:
              break;
        }
    }

    return(
        <>
            <div className="form-buah">
                {/* Form */}
                <h1 className="title">Form Buah</h1>
                <form onSubmit={handleSubmit}>
                    <table className="tbl-form-buah align-left">
                        <tbody>
                            <tr>
                                <td>
                                    <label>
                                        Nama buah
                                    </label>
                                </td>
                                <td>
                                <input id="name" name="name" type="text" value ={inputName} onChange={handleChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Harga
                                </td>
                                <td>
                                <input id="price" name="price" type="text" value ={inputPrice} onChange={handleChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Berat (gr)
                                </td>
                                <td>
                                <input id="weight" name="weight" type="text" value = {inputWeight} onChange={handleChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <button className="form">
                                        Submit
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>   
                </form>
            </div>
        </>
    )
}

export default FruitForm 