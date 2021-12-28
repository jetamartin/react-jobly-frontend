import React, {useEffect, useState} from 'react';
import {Switch, BrowserRouter, Route } from "react-router-dom";
import UsernameContext from './UsernameContext';
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

  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const loadFromLocalStorage = () => {
      setToken(ls.get('token') || "");
      setUsername(ls.get('username') || "")
      setFirstName(ls.get('firstName') || "");
    }
    loadFromLocalStorage()
  }, [])

  
  const loginUser = async (userCredentials) => {
    let results = await JoblyAPI.loginUser(userCredentials)
    setToken(results.token);
    setUsername(userCredentials.username);
    ls.set('token', results.token);
    ls.set('username', userCredentials.username);
    return results; 
  }

  const logoutUser = () => {
    ls.remove('token')
    ls.remove('username')
    ls.remove('firstName')
    setUsername("");
    setToken("");
    setFirstName("");
  }

  const registerUser = async (userInfo) => {
    // debugger;
    let results = await JoblyAPI.registerUser(userInfo);
    setUsername(userInfo.username);
    setFirstName(userInfo.firstName);
    setToken(results.token);
    ls.set('token', results.token);
    ls.set('username', userInfo.username)
    ls.set('firstName', userInfo.firstName);
   }

  const updateUserRegInfo = async (username, userProfileInfo ) => {
    let user = await JoblyAPI.updateUserProfile(username, token, userProfileInfo);
    return user; 
  }

  return (
    <div className="App">

      <BrowserRouter>
        <UsernameContext.Provider value={username}>
        <NavBar token={token} username={username} logoutUser={logoutUser}/>
        <main>
          <Switch>
            <Route exact path="/">
              <Home username={username} token={token} />
            </Route>
            <Route exact path="/companies">
              <CompanyList />
            </Route>
            <Route exact path="/companies/:handle">
              <CompanyDetail username={username} token={token} />
            </Route>
            <Route exact path="/jobs">
               <JobList username={username} token={token} />
            </Route>
            <Route exact path="/login">
              <LoginForm loginUser={loginUser} />
            </Route>
            <Route exact path="/signup" >
              <SignUpForm registerUser={registerUser} />
            </Route>
            <Route exact path ="/profile">
              <ProfileForm  token={token} username={username} updateUserRegInfo={updateUserRegInfo} loginUser={loginUser} />
            </Route>
            <Route>
              <NotFound />
             </Route>
          </Switch>
        </main>
        </UsernameContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;