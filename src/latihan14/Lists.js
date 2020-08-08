import React, {useState, useEffect} from "react"
import axios from "axios"
import "./Lists.css"

const Lists = () => {
  
  const [pesertaLomba, setPesertaLomba] =  useState(null)
  const [inputName, setInputName]  =  useState("")
  const [selectedId, setSelectedId]  =  useState(0)
  const [statusForm, setStatusForm]  =  useState("create")

  useEffect( () => {
    if (pesertaLomba === null){
      axios.get(`http://backendexample.sanbercloud.com/api/contestants`)
      .then(res => {
        setPesertaLomba(res.data.map(el=>{ return {id: el.id, nama: el.name}} ))
      })
    }
  }, [pesertaLomba])
  
  const handleDelete = (event) => {
    let idPeserta = parseInt(event.target.value)

    let newPesertaLomba = pesertaLomba.filter(el => el.id != idPeserta)

    axios.delete(`http://backendexample.sanbercloud.com/api/contestants/${idPeserta}`)
    .then(res => {
      console.log(res)
    })
          
    setPesertaLomba([...newPesertaLomba])
    
  }
  
  const handleEdit = (event) =>{
    let idPeserta = parseInt(event.target.value)
    let peserta = pesertaLomba.find(x=> x.id === idPeserta)
    setInputName(peserta.nama)
    setSelectedId(idPeserta)
    setStatusForm("edit")
  }

  const handleChange = (event) =>{
    setInputName(event.target.value);
  }

  const handleSubmit = (event) =>{
    // menahan submit
    event.preventDefault()

    let name = inputName

    if (name.replace(/\s/g,'') !== ""){      
      if (statusForm === "create"){        
        axios.post(`http://backendexample.sanbercloud.com/api/contestants`, {name})
        .then(res => {
            setPesertaLomba([...pesertaLomba, {id: res.data.id, nama: name}])
        })
      }else if(statusForm === "edit"){
        axios.put(`http://backendexample.sanbercloud.com/api/contestants/${selectedId}`, {name})
        .then(res => {
            let dataPeserta = pesertaLomba.find(el=> el.id === selectedId)
            dataPeserta.nama = name
            setPesertaLomba([...pesertaLomba])
        })
      }
      
      setStatusForm("create")
      setSelectedId(0)
      setInputName("")
    }

  }

  return(
    <>
      <h1>Daftar Peserta Lomba</h1>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>

            {
              pesertaLomba !== null && pesertaLomba.map((item, index)=>{
                return(                    
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.nama}</td>
                    <td>
                      <button onClick={handleEdit} value={item.id}>Edit</button>
                      &nbsp;
                      <button onClick={handleDelete} value={item.id}>Delete</button>
                    </td>
                  </tr>
                )
              })
            }
        </tbody>
      </table>
      {/* Form */}
      <h1>Form Peserta</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Masukkan nama peserta:
        </label>          
        <input type="text" value={inputName} onChange={handleChange}/>
        <button>submit</button>
      </form>
    </>
  )
}

export default Lists
