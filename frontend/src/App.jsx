import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [data, setData] = useState(null);

  useEffect(() => {
    if (!data) {
      fetch('http://localhost:4000/')
        .then(res => res.json())
        .then(data => setData(data));
    }
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Version 2.0.0
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {data ?? 'Loading...'}
      </header>
    </div>
  );
}

export default App;
