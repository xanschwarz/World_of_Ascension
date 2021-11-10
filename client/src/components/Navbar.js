import React from 'react';
import {  Link } from "react-router-dom";
const Navbar= () =>{
  return (
  <div>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/Fighting">Fighting</Link>
    </li>
    <li>
      <Link to="/Gathering">Gathering</Link>
    </li>
    <li>
      <Link to="/Puzzle">Puzzle</Link>
    </li>
    <li>
      <Link to="/Store">Store</Link>
    </li>
  </div>
  );
}
export default Navbar;