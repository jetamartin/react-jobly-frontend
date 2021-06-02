import React, {useEffect, useState} from 'react';
import {Switch, BrowserRouter, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ls from 'local-storage';
import JoblyAPI from './JoblyAPI'
import NavBar from './NavBar';
import Home from './Home'; 
import CompanyList from './CompanyList';
import CompanyDetail from './CompanyDetail'
import JobList from './JobList';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import ProfileForm from './ProfileForm';
import NotFound from './NotFound'; 
import './App.css';

function App() {
  const INITIAL_USER_STATE = "";
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState({});
  const [username, setUsername] = useState("");
  const history = useHistory();
  debugger;
  // if (isLoading) {
  //   return <p>Loading &hellip;</p>;
  // }
   // On intial page load retrieve token from local storage
  useEffect(()=> {
    const getUserToken = async () => {
      setToken(await ls.get('token') || {}) 
    }
    getUserToken();
  }, []);

  useEffect(() => {
    const getUserReg = async () => {
      setUsername(await ls.get('username') || "")
    }
    getUserReg();
  }, [] );

  // API Call to register user on completion of Sign Up Form
  // useEffect(() => {
  //   const registerUser = async (userReg) => {
  //     debugger;
  //     let results = await JoblyAPI.registerUser(userReg);
  //     setToken(results);
  //     await ls.set('token', results.token);
  //     debugger;
  //   }
  //   registerUser(userReg)

  // },[userReg])
  //

  const logoutUser = async () => {
    await ls.set('token', "");
    await ls.set('username', "");
    setUsername("");
    setToken("");
    history.push("/");
  }

  const registerUser = async (userInfo) => {
    let results = await JoblyAPI.registerUser(userInfo);
    setUsername(userInfo.username);
    setToken(token => ({token: results}) )
    await ls.set('token', results.token);
    await ls.set('username', userInfo.username)
    history.push("/");
   }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar token={token} username={username} logoutUser={logoutUser}/>
        <main>
          <Switch>
            <Route exact path="/">
              <Home  />
            </Route>
            <Route exact path="/companies">
              <CompanyList />
            </Route>
            <Route exact path="/companies/:handle">
              <CompanyDetail />
            </Route>
            <Route exact path="/jobs">
              <JobList  />
            </Route>
            <Route exact path="/login">
              <LoginForm />
            </Route>
            <Route exact path="/signup" >
              <SignUpForm registerUser={registerUser} />
            </Route>
            <Route exact path ="/profile">
              <ProfileForm/>
            </Route>
            <Route>
              <NotFound />
             </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;