import React, { useHistory } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

const Logout = ({username, logoutUser}) => {
  const logoutClicked = (e) => {
    logoutUser(e)
  }

  return (
    <>
      <NavItem>
        <NavLink onClick={logoutClicked} to="\" >Log Out {username}</NavLink>
      </NavItem>
    </>
  )
}
export default Logout; 