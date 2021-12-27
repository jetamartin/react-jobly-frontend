import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "reactstrap";
import Login from "./LoggedOut";
import LoggedIn from "./LoggedIn";
import "./NavBar.css";
import logo from "./AcceleratorJobBoardLogo1-1.png"

function NavBar({ username, token, logoutUser }) {
  return (
    <div>
      <Navbar>
        <NavLink exact to="/" className="navbar-brand">
          <img className="NavBar-logo" src={logo}></img>
        </NavLink>
        <Nav className="ml-auto">
          {username ? (
            <LoggedIn
              username={username}
              token={token}
              logoutUser={logoutUser}
            />
          ) : (
            <Login />
          )}
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
