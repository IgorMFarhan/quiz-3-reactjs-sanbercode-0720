import React, {useState, useEffect} from 'react'
import axios from 'axios'

const DaftarFilm = () => {
  
  const [daftarFilm, setDaftarFilm] =  useState(null)
  const [input, setInput]  =  useState({title:'', description:'', year: 0, duration:0, genre:'', rating:0})
  const [selectedId, setSelectedId]  =  useState(0)
  const [statusForm, setStatusForm]  =  useState("create")

  useEffect( () => {
    if (daftarFilm === null){
      axios.get(`http://backendexample.sanbercloud.com/api/movies`)
      .then(res => {
        setDaftarFilm(res.data.map(el=>{ 
          return {id: el.id, 
                  title: el.title, 
                  description: el.description, 
                  year: el.year,
                  duration: el.duration,
                  genre: el.genre,
                  rating: el.rating,
                }} ))
      })
    }
  }, [daftarFilm])
  
  const handleDelete = (event) => {
    let idDataFilm = parseInt(event.target.value)

    let newdaftarFilm = daftarFilm.filter(el => el.id !== idDataFilm)

    axios.delete(`http://backendexample.sanbercloud.com/api/movies/${idDataFilm}`)
    .then(res => {
      console.log(res)
    })
          
    setDaftarFilm([...newdaftarFilm])
    
  }
  
  const handleEdit = (event) =>{
    let idDataFilm = parseInt(event.target.value)
    let dataFilm = daftarFilm.find(x=> x.id === idDataFilm)
    setInput({title: dataFilm.title, 
              description: dataFilm.description, 
              year: dataFilm.year,
              duration: dataFilm.duration,
              genre: dataFilm.genre,
              rating: dataFilm.rating,
            })
    setSelectedId(idDataFilm)
    setStatusForm("edit")
  }

  const handleChange = (event) =>{
    let typeOfInput = event.target.title

    switch (typeOfInput){
      case 'title':
      {
        setInput({...input, title: event.target.value});
        break
      }
      case 'description':
      {
        setInput({...input, description: event.target.value});
        break
      }
      case 'year':
      {
        setInput({...input, year: event.target.value});
          break
      }
      case 'duration':
      {
        setInput({...input, duration: event.target.value});
          break
      }
      case 'genre':
      {
        setInput({...input, genre: event.target.value});
          break
      }
      case 'rating':
      {
        setInput({...input, rating: event.target.value});
          break
      }
    default:
      {break;}
    }
  }

  const handleSubmit = (event) =>{
    // menahan submit
    event.preventDefault()

    let title = input.title
    let description = input.description
    let year = input.year
    let duration = input.duration
    let genre = input.genre
    let rating = input.rating
    

    if (title.replace(/\s/g,'') !== "" && description.replace(/\s/g,'') !== ""){      
      if (statusForm === "create"){        
        axios.post(`http://backendexample.sanbercloud.com/api/movies`, {title: input.title, 
                                                                        description: input.description, 
                                                                        year: input.year,
                                                                        duration: input.duration,
                                                                        genre: input.genre,
                                                                        rating: input.rating,
                                                                      })
        .then(res => {
            setDaftarFilm([
              ...daftarFilm, 
              { id: res.data.id, 
                title: input.title, 
                description: input.description,
                year: input.year,
                duration: input.duration,
                genre: input.genre,
                rating: input.rating,
              }])
        })
      }else if(statusForm === "edit"){
        axios.put(`http://backendexample.sanbercloud.com/api/movies/${selectedId}`, {title: input.title, description: input.description, year: input.year})
        .then(() => {
            let dataFilm = daftarFilm.find(el=> el.id === selectedId)
            dataFilm.title = input.title
            dataFilm.description = input.description
            dataFilm.year = input.year
            dataFilm.duration = input.duration
            dataFilm.genre = input.genre
            dataFilm.rating = input.rating
            setDaftarFilm([...daftarFilm])
        })
      }
      
      setStatusForm("create")
      setSelectedId(0)
      setInput({title: '', description: '', year: 0, duration:0, genre:'', rating:0})
    }

  }

  return(
    <>
      <h1>Daftar Film Terbaik</h1>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Judul Film</th>
            <th>Deskripsi</th>
            <th>Tahun</th>
            <th>Durasi</th>
            <th>Genre</th>            
            <th>Rating</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>

            {
              daftarFilm !== null && daftarFilm.map((item, index)=>{
                return(                    
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>{item.year}</td>
                    <td>{item.duration}</td>
                    <td>{item.genre}</td>                    
                    <td>{item.rating}</td>
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
      <h1>Form Daftar Film Terbaik</h1>

      <div style={{width: "70%", margin: "0 auto", display: "block"}}>
        <div style={{border: "1px solid #aaa", padding: "20px"}}>
          <form onSubmit={handleSubmit}>
            <label style={{float: "left"}}>
              Judul:
            </label>
            <input style={{float: "right"}} type="text" title="title" value={input.title} onChange={handleChange}/>
            <br/>
            <br/>
            <label style={{float: "left"}}>
              Tahun:
            </label>
            <input style={{float: "right"}} type="number" title="year" value={input.year} onChange={handleChange}/>
            <br/>
            <br/>
            <label style={{float: "left"}}>
              Genre:
            </label>
            <input style={{float: "right"}} type="text" title="genre" value={input.genre} onChange={handleChange}/>
            <br/>
            <br/>
            <label style={{float: "left"}}>
              Durasi:
            </label>
            <input style={{float: "right"}} type="number" title="duration" value={input.duration} onChange={handleChange}/>
            <br/>
            <br/>
            <label style={{float: "left"}}>
              Rating:
            </label>
            <input style={{float: "right"}} type="number" title="rating" value={input.rating} onChange={handleChange}/>
            <br/>
            <br/>
            <label style={{float: "left"}}>
              Deskripsi:
            </label>
            <input style={{float: "right"}} type="text" title="description" value={input.description} onChange={handleChange}/>
            <br/>
            <br/>
            <div style={{width: "100%", paddingBottom: "20px"}}>
              <button style={{ float: "right"}}>submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default DaftarFilm