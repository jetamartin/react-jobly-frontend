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

  // const [isLoading, setIsLoading] = useState(true);
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
    }, []);



  useEffect(() => {
    const getUserName= async () => {
      setUsername(await ls.get('username') || "")
    }
    getUserName();
  }, [] );
  

  // 
  useEffect(()  => {
    const updateUserRegFromLS = async () => {
      setUserRegInfo(await JSON.parse(localStorage.getItem('userRegInfo')) || {});
    }
    updateUserRegFromLS()
  }, [])

  // useEffect(() => {
  //   const getListOfJobs = async () => {
  //     let jobs = await JoblyAPI.getAllJobs();
  //     setJobs(jobs)
  //   }
  //   getListOfJobs();
  // }, [])
  
  const loginUser = async (userCredentials) => {
    try {
      let results = await JoblyAPI.loginUser(userCredentials)
      setToken(results.token);
      setUsername(userCredentials.username);
      await ls.set('token', results.token);
      await ls.set('username', userCredentials.username);
      return results; 
    } catch (err) {
      throw err;
    }
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
    try {
      let results = await JoblyAPI.registerUser(userInfo);
      setUserRegInfo(userRegInfo => ({...userRegInfo, ...userInfo}))
      setUsername(userInfo.username);
      setToken(results.token)
      await localStorage.setItem('token', results.token);
      await localStorage.setItem('username', userInfo.username)
      await localStorage.setItem('userRegInfo', JSON.stringify(userInfo));
    } catch (err) {
      throw err;
    }
   }

   const getUserRegInfo = async (username) => {
     try {
      let results = await JoblyAPI.getUserProfile(username, token);
       setUserRegInfo(userRegInfo => ({...userRegInfo, ...results}))
       localStorage.setItem('userRegInfo', JSON.stringify(results));
       return results;
     } catch (err) {
      throw err;
     }
   }

   const updateUserRegInfo = async (username, userProfileInfo ) => {
      try {
        let user = await JoblyAPI.updateUserProfile(username, token, userProfileInfo);
        setUserRegInfo(userRegInfo => ({...userRegInfo, ...user}))
        localStorage.setItem('userRegInfo', JSON.stringify(user));
        return user; 
      } catch (err) {
        throw err
      }
    }

    // const getCompanyJobs = async (handle) => {
    //   try {
    //     let companyJobInfo = await JoblyAPI.getCompany(handle);
    //     // debugger;
    //     return companyJobInfo; 
        
    //   } catch (err) {
    //     throw err;     
    //   }
    // }

  return (
    <div className="App">

      <BrowserRouter>
        <UsernameContext.Provider value={username}>
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
              <ProfileForm userRegInfo={userRegInfo} token={token} username={username} updateUserRegInfo={updateUserRegInfo} loginUser={loginUser} />
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