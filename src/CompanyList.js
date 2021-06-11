import React, {useState, useEffect } from 'react'; 
import { Container, Row, Col } from 'reactstrap';
import JoblyAPI from './JoblyAPI';

import SearchForm from './SearchForm';
import CompanyCard from './CompanyCard';
import JoblyApi from './JoblyAPI';
import './CompanyList.css';

const CompanyList = () => {

  const [companies, setCompanies] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getCompanies = async () => {
      let companyList = await JoblyAPI.getCompanies();
      setCompanies(companyList);
      setIsLoading(false)
    }
    getCompanies()
  }, [])

  const searchCompanies = async (name) => {
    let companyList = await JoblyApi.getCompanies(name); 
    setCompanies(companyList);
    setIsLoading(false);
  }
  if (isLoading) {
    return <p className="CompanyList-loading">Loading &hellip;</p>;
  } 
  return (
    <Container className="CompanyList col-md-8 offset-md-2 mt-4 mb-4">
      <SearchForm searchFunction={searchCompanies}/>
      {companies.map(company => (<CompanyCard company={company}  />))}
    </Container>
  )
}

export default CompanyList; 
