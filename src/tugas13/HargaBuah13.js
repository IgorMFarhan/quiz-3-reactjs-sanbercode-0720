import React from 'react';
import './crud.css';

class BuahRow extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        
        return(
            <>
                <tr key={this.props.key}>
                    <td>{this.props.item.nama}</td>
                    <td>{this.props.item.harga}</td>
                    <td>{this.props.item.berat / 1000 } Kg</td>
                    <td>
                        <button>Edit</button>
                        <button>Delete</button>
                    </td>
                </tr>
            </>
        )
    }
}


class HargaBuah extends React.Component{
    constructor(props){
        super(props)
        this.state={
            daftarBuah : this.props.daftarBuah,
            inputNama : "",
            inputHarga: 0,
            inputBerat: 0,
            indexOfForm: -1  
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit(event){
        event.preventDefault()
        let parNama= this.state.inputNama
        let parHarga=this.state.inputHarga
        let parBerat=this.state.inputBerat

        if (parNama.replace(/\s/g,'')==='') {
            return
        }

        let newBuah = this.state.daftarBuah
        newBuah[this.state.indexOfForm] = {
            nama: parNama,
            harga: parHarga,
            berat: parBerat

        } 

        if (this.state.indexOfForm===-1) {
            this.setState({
                daftarBuah : [...this.state.daftarBuah,{
                    nama: this.state.inputNama,
                    harga:this.state.inputHarga,
                    berat:this.state.inputBerat
                }],
                inputNama : "",
                inputHarga: 0,
                inputBerat: 0,
                indexOfForm: -1
            })
            
        }else{
            this.setState({
                daftarBuah : newBuah,
                inputNama : "",
                inputHarga: 0,
                inputBerat: 0,
                indexOfForm: -1
                
            })
        }

        
    }

    handleEdit(event){
        let index = event.target.value
        let buah = this.state.daftarBuah[index]
        this.setState({
            inputNama : buah.nama,
            inputHarga: buah.harga,
            inputBerat: buah.berat,
            indexOfForm: index
        })
    }

    handleDelete(event){
        let index = event.target.value
        let buah = this.state.daftarBuah
        buah.splice(index,1)
        console.log(buah)

        this.setState({
            daftarBuah : buah,
            inputNama : "",
            inputHarga: 0,
            inputBerat: 0,
            indexOfForm: -1
            
        })
    }

    render(){
        return(
            <>
                <div className="container-tugas13">
                    <h1>Tabel Harga Buah</h1>
                    <table className="tugas13">
                        <thead>
                            <tr>
                                <th>Nama</th>
                                <th>Harga</th>
                                <th>Berat</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                   
                {this.state.daftarBuah.map((buah,index)=>{
                    return(
                        <tr key={index}>
                            <td>{buah.nama}</td>
                            <td>{buah.harga}</td>
                            <td>{buah.berat / 1000 } Kg</td>
                            <td className="action-col">
                                <button onClick={this.handleEdit} value={index}>Edit</button>
                                <button onClick={this.handleDelete} value={index}>Delete</button>
                            </td>
                        </tr>
                    )
                })}
                    </tbody>
                    </table>
                    <div className="form-buah">
                        {/* Form */}
                        <h1>Form Buah</h1>
                        <form onSubmit={this.handleSubmit}>
                            <table className="tbl-form-buah align-left">
                                <tbody>
                                    <tr>
                                        <td>
                                            <label>
                                                Nama buah
                                            </label>
                                        </td>
                                        <td>
                                        <input id="inputNama" name="inputNama" type="text" value = {this.state.inputNama} onChange={this.handleChange}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Harga
                                        </td>
                                        <td>
                                        <input id="inputHarga" name="inputHarga" type="text" value = {this.state.inputHarga} onChange={this.handleChange}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Berat (gr)
                                        </td>
                                        <td>
                                        <input id="inputBerat" name="inputBerat" type="text" value = {this.state.inputBerat} onChange={this.handleChange}/>
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
}

export default HargaBuah