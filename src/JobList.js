

import React from 'react'; 
import { Container, Row, Col } from 'reactstrap';

import SearchForm from './SearchForm';
import JobCard from './JobCard';
// import JobDetails from './JobDetails';




const JobList = ({jobs}) => {
  return (
    <Container className="col-md-8 offset-md-2 mt-4 mb-4">
      <Row>
        <SearchForm />
      </Row>
     

      {jobs.map(job => (<JobCard job={job}  />))}
    </Container>
  
  )

}

export default JobList; 