import React, {useState, useEffect} from "react"
import axios from "axios"


const HargaBuah = () => {
    const [daftarBuah,setDaftarBuah] = useState(null)
    const [inputNama, setInputNama] = useState("")
    const [inputHarga,setInputHarga] = useState(0)
    const [inputBerat,setInputBerat] = useState(0)
    const [selectedId, setSelectedId]  =  useState(0)
    const [statusForm, setStatusForm]  =  useState("create")

    useEffect( () => {
        if (daftarBuah === null){
          axios.get(`http://backendexample.sanbercloud.com/api/fruits`)
          .then(res => {
            setDaftarBuah(res.data.map(el=>{ 
                return {
                    id: el.id, 
                    nama: el.name,
                    harga: el.price,
                    berat: el.weight
                }
            } ))
          })
        }
      }, [daftarBuah])

      const handleDelete = (event) => {
          let idBuah = parseInt(event.target.value)
          let newDaftarBuah  = daftarBuah.filter(el => el.id !== idBuah)

          axios.delete(`http://backendexample.sanbercloud.com/api/fruits/${idBuah}`)
          .then(res => {
              console.log(res)
          })
          setDaftarBuah([...newDaftarBuah])
      }

      const handleEdit = (event) => {
        let idBuah = parseInt(event.target.value)
        let buah = daftarBuah.find(el => el.id === idBuah)

        setSelectedId(idBuah)
        setInputNama(buah.nama === null ? "": buah.nama)
        setInputHarga(buah.harga === null ? 0: buah.harga)
        setInputBerat(buah.berat === null ? 0 : buah.berat)
        setStatusForm("edit")
      }

      const handleChange = (event) => {
          let typeOfInput = event.target.name
          switch (typeOfInput) {
            case "nama":
                setInputNama(event.target.value)
                break;
            case "berat":
                setInputBerat(event.target.value)
                break;
            case "harga":
                setInputHarga(event.target.value)
                break;
            default:
                break;
          }
      }

      const handleSubmit = (event) => {
        event.preventDefault()
        let nama = inputNama
        let harga = parseInt(inputHarga)
        let berat = parseInt(inputBerat)


        if (nama.replace(/\s/g,'') === '') {
            return
        }

        if (statusForm === 'create') {
            axios.post(`http://backendexample.sanbercloud.com/api/fruits`,{name: nama,price: harga,weight: berat})
            .then(res => {
                setDaftarBuah([...daftarBuah,{id: res.data.id,nama: res.data.name,harga: res.data.price,berat: res.data.weight}])
            }).catch(error => {
                console.log(error)
            })
        } else {
            axios.put(`http://backendexample.sanbercloud.com/api/fruits/${selectedId}`,{name: nama,price: harga,weight: berat})
            .then(res => {
                let selectBuah = daftarBuah.find(el => el.id === selectedId)
                selectBuah.nama = nama
                selectBuah.harga = harga
                selectBuah.berat = berat
                setDaftarBuah([...daftarBuah])

            }).catch(error => {
                console.log(error)
            })
        }

        setStatusForm("create")
        setSelectedId(0)
        setInputNama("")
        setInputHarga(0)
        setInputBerat(0)

      }

      return(
        <>
        <div className="container-tugas11">
        <h1 className="title">Tabel Harga Buahan</h1>
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
            daftarBuah !== null && daftarBuah.map((buah,index) => {
                return(
                    <tr key={index}>
                        <td>{buah.nama}</td>
                        <td>{buah.harga}</td>
                        <td>{buah.berat / 1000 } Kg</td>
                        <td className="action-col">
                            <button onClick={handleEdit} value={buah.id}>Edit</button>
                            <button onClick={handleDelete} value={buah.id}>Delete</button>
                        </td>
                    </tr>
                )
            })
        }
            </tbody>
            </table>
            <div className="form-buah">
                {/* Form */}
                <h1>Form Buah</h1>
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
                                <input id="name" name="nama" type="text" value ={inputNama} onChange={handleChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Harga
                                </td>
                                <td>
                                <input id="harga" name="harga" type="text" value ={inputHarga} onChange={handleChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Berat (gr)
                                </td>
                                <td>
                                <input id="berat" name="berat" type="text" value = {inputBerat} onChange={handleChange}/>
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

        </div>
    </>
      )

}

export default HargaBuah