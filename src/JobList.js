import React, {useState, useEffect} from 'react'; 
import { Container, Row } from 'reactstrap';

import SearchForm from './SearchForm';
import JobCard from './JobCard';
import JoblyAPI from './JoblyAPI';
import './JobList.css';

const JobList = ({username, token}) => {
  
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [jobsApplied, setJobsApplied] = useState([])

  useEffect(() => {
    const getListOfJobs = async () => {
      try {
        let jobs = await JoblyAPI.getAllJobs();
        setJobs(jobs)
        let userProfile = await JoblyAPI.getUserProfile(username, token);
        setJobsApplied(userProfile.applications);
        setIsLoading(false);
      } catch (error) {
        console.log(error)
      }
    }
    getListOfJobs();
  }, [username, token])

  const searchJobs = async (title) => {
    let jobsList = await JoblyAPI.getAllJobs(title); 
    setJobs(jobsList);
    setIsLoading(false);
  }

  if (isLoading) {
    return <p className="JobList-loading">Loading &hellip;</p>;
  } 

  return (
    <Container className="col-md-8 offset-md-2 mt-4 mb-4">
      <Row>
        <SearchForm searchFunction={searchJobs} />
      </Row>
      {jobs.map(job => (<JobCard key={job.id} job={job} username={username} token={token} jobsApplied={jobsApplied}  />))}
    </Container>
  )
}

export default JobList; 