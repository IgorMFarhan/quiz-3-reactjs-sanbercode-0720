import React from 'react';
// import './App.css';
import './public/css/style.css';
import {BrowserRouter as Router} from 'react-router-dom'
import Routes from './home/Routes'

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
