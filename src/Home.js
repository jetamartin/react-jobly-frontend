import React from 'react'; 
import { Jumbotron, Button } from "reactstrap";
import {Link} from 'react-router-dom';

const Home = ({username}) => {
  return (
    <div className="HomePage text-center mt-5">
      <Jumbotron >
        <h1 className="display-3 ">Jobly</h1>
        <p className="lead">All the jobs in one, convenient place.</p>
        <hr className="" />
        {username ? 
        (<h2>Welcome Back, {username}!</h2>)
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