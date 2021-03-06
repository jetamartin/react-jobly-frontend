import React from "react";
import { NavLink } from "react-router-dom";
import { NavItem } from "reactstrap";
import {useHistory} from "react-router-dom";

const LoggedIn = ({username, token, logoutUser}) => {
  const history = useHistory();
  const logoutClicked = (e) => {
    logoutUser();
    history.push("/");
  }

  return (
    <>
      <NavItem>
        <NavLink to="/companies">Companies</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/jobs">Jobs</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/profile">Profile</NavLink>
      </NavItem>
      <NavItem>
        <NavLink id="logout" onClick={logoutClicked} to="\" >Log Out {username}</NavLink>
      </NavItem>
    </>
  )
}
export default LoggedIn; 