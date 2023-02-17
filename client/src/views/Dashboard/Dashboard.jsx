import { useState } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Routes, Route } from "react-router-dom"
import Navbar from "../../components/Navbar/Navbar"

import { Container } from 'semantic-ui-react'



function Dashboard() {


  return (
    <div className="Dashboard">
        <Container >
            <Navbar />


        </Container>
  
  
    </div>
  )
}

export default Dashboard
