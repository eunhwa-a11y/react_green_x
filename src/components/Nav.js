import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ()=>{
  return(
    <nav  className='mt-3'>
      <ul className='d-flex gap-3'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </nav>
  )
}
export default Nav;