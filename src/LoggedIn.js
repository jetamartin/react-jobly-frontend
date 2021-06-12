import React from "react";
import { NavLink } from "react-router-dom";
import { NavItem } from "reactstrap";
import {useHistory} from "react-router-dom";
import JoblyAPI from './JoblyAPI';

const LoggedIn = ({username, token, logoutUser}) => {
  const history = useHistory();
  const logoutClicked = (e) => {
    logoutUser();
    history.push("/");
  }

  const getUserProfile = async (e) => {
    debugger;
    let results = await JoblyAPI.getUserProfile(username, token);
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
        {/* <NavLink onClick={getUserProfile} to="/profile">Profile</NavLink> */}
        <NavLink to="/profile">Profile</NavLink>


      </NavItem>
      <NavItem>
        <NavLink onClick={logoutClicked} to="\" >Log Out {username}</NavLink>
      </NavItem>
    </>
  )
}
export default LoggedIn; 