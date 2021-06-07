import React, {useState, useEffect } from 'react'; 
import { Container, Row, Col } from 'reactstrap';
import JoblyAPI from './JoblyAPI';

import SearchForm from './SearchForm';
import CompanyCard from './CompanyCard';
import JoblyApi from './JoblyAPI';
// const CompanyList = ({companies}) => {
const CompanyList = () => {

  const [companies, setCompanies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchFilter, setSearchFilter] = useState({})

  useEffect((searchFilter) => {
    const getCompanies = async (searchFilter) => {
      let companyList = await JoblyAPI.getCompanies(searchFilter);
      debugger;
      setCompanies(companies => ([...companies, ...companyList]))
      setIsLoading(false)
    }
    getCompanies()
  }, [searchFilter])

  const searchCompanies = async (filter) => {
    let companyList = await JoblyApi.getCompanies(filter); 
    debugger;
    setSearchFilter(search => ({...search, ...filter}))
    // setCompanies(companies => ([...companies, ...companyList]))
    setIsLoading(false);
  }

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  } 
  return (
    <Container className="CompanyList col-md-8 offset-md-2 mt-4 mb-4">
      <SearchForm searchCompanies={searchCompanies}/>
      {companies.map(company => (<CompanyCard company={company}  />))}
    </Container>
  
  )

}

export default CompanyList; 
