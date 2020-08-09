import React from "react";
import {Switch, Route, Link} from 'react-router-dom';
import ListMovie from '../listmovie/ListMovie'
import Home from './Home'
import About from '../about/About'
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
            <Route path='/'>
                <Home />
            </Route>
            </Switch>   
        </section>
    </>
    )
}

export default Routes; 