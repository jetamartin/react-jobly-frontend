import React, { useState, useEffect } from 'react'; 
import { Jumbotron, Button } from "reactstrap";
import {Link} from 'react-router-dom';
import JoblyAPI from './JoblyAPI';

const Home = ({username, token}) => {

  const [firstName, setFirstName] = useState("");

  useEffect (() => {
    if (!token) {
      console.log("Refresh firstName");
      setFirstName("");
    }
  }, [token]);


  useEffect(() => {
    const getUserName = async () => {
      try {
        let userRegInfo = await JoblyAPI.getUserProfile(username, token)
        setFirstName(userRegInfo.firstName)
      } catch (error) {
        console.log(error)
      }
    }
    getUserName()
  }, [username, token]);

  return (
    <div className="HomePage text-center mt-5">
      <Jumbotron >
        <h1 className="display-3 ">Jobly</h1>
        <p className="lead">All the jobs in one, convenient place.</p>
        <hr className="" />
        { firstName ? 
        (<h2>Welcome Back, {firstName}!</h2>)
        :
         <p className="lead">
          <Link to="login"> 
              <Button className="m-2" color="primary">Log In</Button>
          </Link>
          <Link to="signup">
            <Button className="m-2" color="primary">Sign Up</Button>
          </Link>
        </p>}
      </Jumbotron>
    </div>
  )

}

export default Home; 