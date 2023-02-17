import { useState } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    BrowserRouter as Router,
    Route,Routes
  } from 'react-router-dom';

import Dashboard from "./views/Dashboard/Dashboard"



function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />}/>
            </Routes>
        </Router>
    </div>
  )
}

export default App
