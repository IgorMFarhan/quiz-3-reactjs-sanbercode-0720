import React from 'react';
import './public/css/style.css';
import {BrowserRouter as Router} from 'react-router-dom'
import Routes from './quiz3/Routes'

function App() {
  return (
    <div>
      <Router>
        <Routes/>
      </Router>
    </div>
  );
}

export default App;
