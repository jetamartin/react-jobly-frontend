import React, {useState, useEffect} from 'react'; 
import { Container, Row, Col } from 'reactstrap';

import SearchForm from './SearchForm';
import JobCard from './JobCard';
import JoblyAPI from './JoblyAPI';

const JobList = ({username, token}) => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [jobsApplied, setJobsApplied] = useState([])

  useEffect(() => {
    const getListOfJobs = async () => {
      let jobs = await JoblyAPI.getAllJobs();
      setJobs(jobs)
      let userProfile = await JoblyAPI.getUserProfile(username, token);
      debugger;
      setJobsApplied(userProfile.applications);
      setIsLoading(false);
    }
    getListOfJobs();
  }, [])

  const searchJobs = async (title) => {
    let jobsList = await JoblyAPI.getAllJobs(title); 
    setJobs(jobsList);
    setIsLoading(false);
  }

  if (isLoading) {
    return <p>Loading &hellip;</p>;
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