import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <h2>AI Code Review Assistant</h2>
      </div>

      <ul className="nav-links">
  <li><a href="#">Home</a></li>
  <li><a href="#">Dashboard</a></li>
  <li><a href="#">Login</a></li>
  <li><a href="#">Register</a></li>
</ul>

<button className="review-btn">
  Review Code
</button>

    </nav>
  );
}

export default Navbar;