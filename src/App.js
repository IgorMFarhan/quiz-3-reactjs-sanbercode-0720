import React from 'react';
import './public/css/style.css';
import {BrowserRouter as Router} from 'react-router-dom'
import Routes from './home/Routes'
import Login from './login/LoginProvider'

function App() {
  return (
    <div>
      <Login>
      <Router>
        <Routes/>
      </Router>
      </Login>
    </div>
  );
}
export default App;
