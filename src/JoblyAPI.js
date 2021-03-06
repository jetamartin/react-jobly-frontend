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
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async getCompanies(name) {
    let res
    if (name) {
      res = await this.request1(`companies`, {name});
    } else {
      res = await this.request1(`companies`);
    }
    return res.companies; 
  }

  static async getAllJobs(title) {
    let res;
    if (title) {
      res = await this.request1(`jobs`, {title});
    } else {
      res = await this.request1(`jobs`);
    }
    return res.jobs;
  }

  
  static async registerUser(newUserInfo) {
    let res = await this.request(`auth/register`,newUserInfo, "post");
    return res;
  }

  static async loginUser(userCredentials) {
    let res = await this.request(`auth/token`, userCredentials, "post");
    return res; 
  }

  static async request1(endpoint, data = {}, method = "get", token="") {
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
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getUserProfile(username, token) {
    let res = await this.request1(`users/${username}`, {}, 'get', token);
    return res.user;
  }

  static async updateUserProfile(username, token, userProfileInfo) {
    let res = await this.request1(`users/${username}`, userProfileInfo, 'patch', token);
    return res.user; 
  }

  // POST /[username]/jobs/[id]  { state } => { application }
  static async applyForJob(username, jobId, token1) {
    let applicationStatus = await this.request1(`users/${username}/jobs/${jobId}`, {}, 'post', token1)
    return applicationStatus
  }

}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";


export default JoblyApi;