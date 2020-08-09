import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Home = () => {
  
  const [daftarFilm, setDaftarFilm] =  useState(null)

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
          </tr>
        </thead>
        <tbody>

            {
              daftarFilm !== null && daftarFilm.sort((a, b) => b.rating - a.rating).map((item, index)=>{
                return(                    
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>{item.year}</td>
                    <td>{item.duration}</td>
                    <td>{item.genre}</td>                    
                    <td>{item.rating}</td>
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