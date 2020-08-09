import React from "react";
import {Switch, Route, Link} from 'react-router-dom';

import HargaBuah from '../tugas11/HargaBuah'
import CountDown from '../tugas12/CountDown'
import HargaBuah13 from '../tugas13/HargaBuah13'
import HargaBuah14 from '../tugas14/HargaBuah14'
import Fruit from './Fruit'
import Header from './Header'

let dataHargaBuah = [
    {nama: "Semangka", harga: 10000, berat: 1000},
    {nama: "Anggur", harga: 40000, berat: 500},
    {nama: "Strawberry", harga: 30000, berat: 400},
    {nama: "Jeruk", harga: 30000, berat: 1000},
    {nama: "Mangga", harga: 30000, berat: 500}
  ]



const Routes = () => {
    return (
        <>
        <Header/>
        
        <section>
        <Switch>
          <Route path='/tugas11'>
              <HargaBuah/>
          </Route>
          <Route path='/tugas12'>
              <CountDown countStart={100}/>
          </Route>
          <Route path='/tugas13'>
              <HargaBuah13 daftarBuah={dataHargaBuah} />
          </Route>
          <Route path='/tugas14'>
              <HargaBuah14 />
          </Route>
          <Route path='/'>
              <Fruit />
          </Route>

      </Switch>   
        </section>

    </>
    )
}

export default Routes; 