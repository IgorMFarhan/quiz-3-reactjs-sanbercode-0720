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
      {
        daftarFilm !== null && daftarFilm.sort((a, b) => b.rating - a.rating).map((item, index)=>{
          return(    
            <>
            <h2>{item.title}</h2>
            <strong>Rating: {item.rating}</strong><br></br>
            <strong>Durasi: {item.duration/60} jam</strong><br></br>
            <strong>Genre: {item.genre}</strong><br></br>
            <strong>Deskripsi:</strong> {item.description}<br></br>
            <hr></hr>
            </>                    
              
            

              
          )
        })
      }
      
    </>
  )
}

export default Home