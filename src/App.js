import './App.css';
import React from 'react'
import Nav from './Components/Nav_Bar'
import FindEvent from './Pages/Find_Events'
import FindMusic from './Pages/Find_Musicians'
import Home from './Pages/Home'
import Account_Musician from './Pages/Account_Musician'
import Account_EventHost from './Pages/Account_EventHost'
import Sign_Up_Musician from './Pages/Sign_Up_Musician'
import Sign_Up_Event_Planner from './Pages/Sign_Up_Event_Planner'
import Intermediate_Sign_Up_Page from './Pages/Intermediate_Sign_Up_Page';
import Create_Group from './Pages/Create_Group'
import Create_Event from './Pages/Create_Event'
import Login from './Pages/Login'
import Confirm_User from './Pages/Confirm_User'
import {Route, Routes} from 'react-router-dom'


export default function App() {
  return (
  <React.Fragment>
     <Nav />
    <div className='container'>
      <Routes>
        <Route path = '/Home' element = {<Home />} />
        <Route path = '/Account_Musician' element = {<Account_Musician />} />
        <Route path = '/Account_Event_Host' element = {<Account_EventHost />} />
        <Route path = '/Find_Events' element = {<FindEvent />} />
        <Route path = '/Find_Musicians' element = {<FindMusic />} />
        <Route path = '/Login' element = { <Login /> } />
        <Route path = '/Intermediate_Sign_Up_Page' element = {<Intermediate_Sign_Up_Page />} />
        <Route path = '/Sign_Up_Musician' element = {<Sign_Up_Musician />} />
        <Route path = '/Sign_Up_Event_Planner' element = {<Sign_Up_Event_Planner />} />
        <Route path = '/Confirm_User/:username' element = {<Confirm_User />} />
        <Route path = '/Create_Group' element = {<Create_Group />} />
        <Route path = '/Create_Event' element = {<Create_Event />} />
       </Routes>

    </div>
  </React.Fragment>
   
  )
}
