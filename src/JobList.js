import React, {useState, useEffect} from 'react'; 
import { Container, Row, Col } from 'reactstrap';

import SearchForm from './SearchForm';
import JobCard from './JobCard';
import JoblyAPI from './JoblyAPI';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getListOfJobs = async () => {
      let jobs = await JoblyAPI.getAllJobs();
      setJobs(jobs)
    }
    getListOfJobs();
  }, [])

  const searchJobs = async (title) => {
    let jobsList = await JoblyAPI.getAllJobs(title); 
    setJobs(jobsList);
    setIsLoading(false);
  }

  return (
    <Container className="col-md-8 offset-md-2 mt-4 mb-4">
      <Row>
        <SearchForm searchFunction={searchJobs} />
      </Row>
      {jobs.map(job => (<JobCard job={job}  />))}
    </Container>
  
  )
}

export default JobList; 