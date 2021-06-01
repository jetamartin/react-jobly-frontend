

import React from 'react'; 
import { Container, Row, Col } from 'reactstrap';

import SearchForm from './SearchForm';
import JobCard from './JobCard';
const JobList = () => {
  return (
    <Container className="col-md-8 offset-md-2 mt-4 mb-4">
      <Row>
        <SearchForm />
      </Row>
     

      <JobCard />
    </Container>
  
  )

}

export default JobList; 