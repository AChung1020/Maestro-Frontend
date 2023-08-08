import React from 'react'
import {Link} from 'react-router-dom'

export default function Nav_Bar () {
    return <nav className = 'nav'>
        <Link to = "/Home" className='site-title'>Maestro</Link>
        <ul>
            <li>
                <Link to ='/Account'>ACCOUNT</Link>
            </li>
            <li>
                <Link to='/Login'>LOGIN</Link>
            </li>
            <li>
                <Link to ='/Intermediate_Sign_Up_Page'>SIGN UP</Link>
            </li>
            <li>
                <Link to='/Find_Events'>EVENTS</Link>
            </li>
            <li>
                <Link to='/Find_Musicians'>MUSICIANS</Link>
            </li>
        </ul>
    </nav>
}