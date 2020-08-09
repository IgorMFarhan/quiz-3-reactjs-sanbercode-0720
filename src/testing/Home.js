import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Home = () => {
  
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
      
    </>
  )
}

export default Home