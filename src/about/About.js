import React, {Component} from 'react';
let identitas = [
    {nama: 'Igor M Farhan', 
     email: 'igormfarhan2@gmail.com', 
     os: 'Catalina',
     github: 'igormfarhan',
     telegram: 'igormfarhan'
     
    },
]
class About extends Component{
    render(){
        return(
            <>
            <h1>Data Peserta Sanbercode Bootcamp Reactjs</h1>
            {identitas.map(id=> {
                return (
                    <ol>
                        <li><strong>Nama:</strong> {id.nama}</li> 
                        <li><strong>Email:</strong> {id.email}</li> 
                        <li><strong>Sistem Operasi yang digunakan:</strong> {id.os}</li>
                        <li><strong>Akun Github:</strong> {id.github}</li> 
                        <li><strong>Akun Telegram:</strong> {id.telegram}</li> 
                    </ol>
                )
                })}
            
            </>
            

        )
    }
}
export default About;