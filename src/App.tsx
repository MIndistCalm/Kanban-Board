import React from 'react'
import { Route } from 'react-router'
import { Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage/HomePage'

function App() {
  return <>
  <Routes>
    <Route path="/" element={<HomePage />} />
    {/* <Route path="*" element={<NotFound />} /> */}
  </Routes>
</>
}

export default App
