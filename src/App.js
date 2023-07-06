import './App.css';
import React from 'react'
import Nav from './Components/Nav_Bar'
import FindEvent from './Pages/Find_Events'
import FindMusic from './Pages/Find_Musicians'
import Home from './Pages/Home'
import Account from './Pages/Account'
import Sign_Up from './Pages/Sign_Up'
import Login from './Pages/Login'
import {Route, Routes} from 'react-router-dom'


export default function App() {
  return (
  <React.Fragment>
     <Nav />
    <div className='container'>
      <Routes>
        <Route path = '/Home' element = {<Home />} />
        <Route path = '/Account' element = {<Account />} />
        <Route path = '/Find_Events' element = {<FindEvent />} />
        <Route path = '/Find_Musicians' element = {<FindMusic />} />
        <Route path = '/Login' element = { <Login /> } />
        <Route path = '/Sign_Up' element = {<Sign_Up />} />
       </Routes>
    </div>
  </React.Fragment>
   
  )
}
