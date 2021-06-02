import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

const Login = () => {
  return (
    <>
      <NavItem>
        <NavLink to="/login">Login</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/signup">Sign Up</NavLink>
      </NavItem>
  </>
  )
}
export default Login; 