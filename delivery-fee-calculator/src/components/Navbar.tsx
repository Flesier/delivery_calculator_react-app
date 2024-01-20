import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='shadow-md bg-slate-100 navbar'>
      <h1>Delivery Fee Calculator</h1>
      <div>
        <ul>
          <li>
            <Link to="/">Calculator</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
