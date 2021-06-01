import React from 'react'; 
import { Container, Row, Col } from 'reactstrap';

import SearchForm from './SearchForm';
import CompanyCard from './CompanyCard';
const CompanyList = () => {
  return (
    <Container className="CompanyList col-md-8 offset-md-2 mt-4 mb-4">
      <SearchForm />
      <CompanyCard />
    </Container>
  
  )

}

export default CompanyList; 
