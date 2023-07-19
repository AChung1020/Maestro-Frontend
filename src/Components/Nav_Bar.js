import React from 'react'
import {Link} from 'react-router-dom'

export default function Nav_Bar () {
    return <nav className = 'nav'>
        <Link to = "/Home" className='site-title'>Site Name</Link>
        <ul>
            <li>
                <Link to ='/Account'>Account</Link>
            </li>
            <li>
                <Link to='/Login'>Login</Link>
            </li>
            <li>
                <Link to ='/Intermediate_Sign_Up_Page'>Sign Up</Link>
            </li>
            <li>
                <Link to='/Find_Events'>Events</Link>
            </li>
            <li>
                <Link to='/Find_Musicians'>Musicians</Link>
            </li>
        </ul>
    </nav>
}