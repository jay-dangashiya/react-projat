import { NavLink } from "react-router-dom";
import "../../src/index.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>Navigator App</h2>
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/products">Products</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;