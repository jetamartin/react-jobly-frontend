import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import Login from './LoggedOut';
import LoggedIn from './LoggedIn';
import "./NavBar.css";

function NavBar({username, token, logoutUser}) {
 
  return (
    <div>
      <Navbar >
        <NavLink exact to="/" className="navbar-brand">
          Jobly
        </NavLink>
        <Nav className="ml-auto">
          {/* <NavItem>
            <NavLink to="/companies">Companies</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/jobs">Jobs</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/profile">Profile</NavLink>
          </NavItem> */}
          {username ? (<LoggedIn username={username} logoutUser={logoutUser}/>)
           : (<Login />)
          }
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
