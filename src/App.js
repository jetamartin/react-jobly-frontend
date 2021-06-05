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

  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [userRegInfo, setUserRegInfo] = useState({})
  
  // if (isLoading) {
  //   return <p>Loading &hellip;</p>;
  // }
   // On intial page load retrieve token from local storage
  useEffect(()=> {
      const getUserToken = async () => {
      setToken(await ls.get('token') || {}) 
    }
    getUserToken();
  // }, [token]);
  }, []);



  useEffect(() => {
    const getUserName= async () => {
      setUsername(await ls.get('username') || "")
    }
    getUserName();
  // }, [username] );
  }, [] );
  

  //
  useEffect(()  => {
    const updateUserRegFromLS = async () => {
      setUserRegInfo(await JSON.parse(localStorage.getItem('userRegInfo')) || {});
    }
    updateUserRegFromLS()
  }, [])
  
  const loginUser = async (userCredentials) => {

    let results = await JoblyAPI.loginUser(userCredentials)
    // setToken(token => ({token: results}))
    setToken(results.token);
    debugger;
    setUsername(userCredentials.username);
    await ls.set('token', results.token);
    await ls.set('username', userCredentials.username); 
  }

  const logoutUser = async () => {
    await localStorage.removeItem('token')
    await localStorage.removeItem('username')
    await localStorage.removeItem("userRegInfo")
    setUsername("");
    setToken("");
    setUserRegInfo({})
  }

  const registerUser = async (userInfo) => {
    let results = await JoblyAPI.registerUser(userInfo);
    // debugger;
    setUserRegInfo(userRegInfo => ({...userRegInfo, ...userInfo}))
    debugger;
    setUsername(userInfo.username);
    // debugger;
    // setToken(token => ({token: results}) )
    setToken(results.token)
    await localStorage.setItem('token', results.token);
    await localStorage.setItem('username', userInfo.username)
    await localStorage.setItem('userRegInfo', JSON.stringify(userInfo));
   }

   const getUserRegInfo = async (username) => {
     let results = await JoblyAPI.getUserProfile(username, token);
     debugger;
     setUserRegInfo(userRegInfo => ({...userRegInfo, ...results}))
     localStorage.setItem('userRegInfo', JSON.stringify(results));
     return results;
   }

   const updateUserRegInfo = async (username, userProfileInfo ) => {
      debugger;
      let user = await JoblyAPI.updateUserProfile(username, token, userProfileInfo);
      setUserRegInfo(userRegInfo => ({...userRegInfo, ...user}))
      localStorage.setItem('userRegInfo', JSON.stringify(user));
      return user; 
    }


  return (
    <div className="App">
      <BrowserRouter>
        <NavBar token={token} username={username} logoutUser={logoutUser}/>
        <main>
          <Switch>
            <Route exact path="/">
              <Home username={username} />
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
              <LoginForm loginUser={loginUser} />
            </Route>
            <Route exact path="/signup" >
              <SignUpForm registerUser={registerUser} />
            </Route>
            <Route exact path ="/profile">
              <ProfileForm userRegInfo={userRegInfo} token={token} username={username} updateUserRegInfo={updateUserRegInfo} getUserRegInfo={getUserRegInfo} />
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