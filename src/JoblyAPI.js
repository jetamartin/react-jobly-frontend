import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      debugger;
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    try {
      let res = await this.request(`companies/${handle}`);
      return res.company;

    } catch (error) {
      throw error;
    }

  }

  static async getCompanies(name) {
    // debugger;
    let res
    try {
      if (name) {
        res = await this.request1(`companies`, {name});
      } else {
        res = await this.request1(`companies`);
      }
      return res.companies; 
    } catch (error) {
      throw error;
    }

  }

  static async getAllJobs(title) {
    let res;
    try {
      if (title) {
        res = await this.request1(`jobs`, {title});
      } else {
        res = await this.request1(`jobs`);
      }
      
      // debugger;
      return res.jobs;
      
    } catch (error) {
      throw error;
    }

  }

  
  static async registerUser(newUserInfo) {
    try {
      let res = await this.request(`auth/register`,newUserInfo, "post");
      return res;
    } catch (error) {
      throw error;
    }

  }

  static async loginUser(userCredentials) {
    try {
      let res = await this.request(`auth/token`, userCredentials, "post");
      return res; 
    } catch (error) {
      // debugger
      // console.error("API Error:", err.response);
      // let message = err.response.data.error.message;
      // throw Array.isArray(message) ? message : [message];
      throw error;
    }
  }

  static async request1(endpoint, data = {}, method = "get", token="") {
    console.debug("API Call:", endpoint, data, method, token);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    let headers = {}
    if (token) {
      headers = { Authorization: `Bearer ${token}` };
    } 
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      debugger;
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getUserProfile(username, token) {
    // debugger;
    try {
      let res = await this.request1(`users/${username}`, {}, 'get', token);
      debugger;
      return res.user;
    } catch (error) {
      throw error;
    }

  }

  static async updateUserProfile(username, token, userProfileInfo) {
    // debugger; 
    try {
      let res = await this.request1(`users/${username}`, userProfileInfo, 'patch', token);
      debugger;
      return res.user; 
    } catch (error) {
      throw error;

    }
  }
  // POST /[username]/jobs/[id]  { state } => { application }
  static async applyForJob(username, jobId, token1) {
    try {
      debugger
      let applicationStatus = await this.request1(`users/${username}/jobs/${jobId}`, {}, 'post', token1)
      debugger
      return applicationStatus
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";


export default JoblyApi;