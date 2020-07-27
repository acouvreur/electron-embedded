import React, { useEffect, useState, useCallback } from "react"
import logo from './logo.svg'
import './Content.css';
import { Button } from "@material-ui/core";

const Content = () => {
  const [data, setData] = useState(null);
  const fetchData = useCallback(() => {
    setData(null)
    fetch('http://localhost:4000/')
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  useEffect(() => {
    if (!data) {
      fetchData();
    }
  })

  return <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
  </a>

      <Button color="primary" variant="contained" onClick={fetchData} >
        Fetch
      </Button>
      {data ?? 'Loading...'}
    </header>
  </div>
}
export default Content;