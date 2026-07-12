
import { Link } from "react-router-dom";

import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <h2>AI Code Review Assistant</h2>
      </div>

   <ul className="nav-links">
  <li><Link to="/">Home</Link></li>
  <li><Link to="/dashboard">Dashboard</Link></li>
  <li><Link to="/login">Login</Link></li>
  <li><Link to="/register">Register</Link></li>
</ul>

<button className="review-btn">
  Review Code
</button>

    </nav>
  );
}

export default Navbar;