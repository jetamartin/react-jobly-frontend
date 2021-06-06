import React, { useState, useEffect } from 'react'; 
import { useParams} from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import './CompanyDetail.css';
import JobCard from './JobCard';

const CompanyDetail = ({getCompanyJobs}) => {
  const [isLoading, setIsLoading] = useState(true)
  const {handle} = useParams();
  const [companyJobData, setCompanyJobData ] = useState({})
  useEffect(() => {
    const getCompanyJobData = async () => {
      let results = await getCompanyJobs(handle);
      debugger;
      setCompanyJobData(companyJobData => ({...companyJobData, ...results}));
      setIsLoading(false)
  
    }
    getCompanyJobData()
  },[])

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <Container className="col-8 pt-5">
      <h4>{companyJobData.name}</h4>
      {console.log(companyJobData)}
      <p>{companyJobData.description}</p>
      {/* Get all jobs openings for this company
      Map through all return jobs <Jobcard>. that match this employer  */}
      {companyJobData.jobs.map(job => (<JobCard key={job.id} job={job} />))}
    </Container>

  )

}

export default CompanyDetail; 