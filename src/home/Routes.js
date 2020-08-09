import React from "react";
import {Switch, Route} from 'react-router-dom';
import ListMovie from '../listmovie/ListMovie'
import Home from './Home'
import About from '../about/About'
import Login from '../login/Login'
import Header from './Header'


const Routes = () => {
    return (
        <>
        <Header/>
        <section>
            <Switch>
            <Route path='/about'>
                <About />
            </Route>
            <Route path='/listmovie'>
                <ListMovie />
            </Route>
            <Route path='/login'>
                <Login />
            </Route>
            <Route path='/'>
                <Home />
            </Route>
            </Switch>   
        </section>
        <footer>
            <h5>copyright &copy; 2020 by Sanbercode</h5>
        </footer>
    </>
    )
}

export default Routes; 