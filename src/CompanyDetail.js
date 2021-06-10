import { set } from 'local-storage';
import React, { useState, useEffect } from 'react'; 
import { useParams} from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import './CompanyDetail.css';
import JobCard from './JobCard';
import JoblyAPI from './JoblyAPI';

const CompanyDetail = ({username, token}) => {
  const [isLoading, setIsLoading] = useState(true)
  const {handle} = useParams();
  const [companyJobData, setCompanyJobData ] = useState({})
  const [jobsApplied, setJobsApplied] = useState([])
  useEffect(() => {
    const getCompanyJobData = async () => {
      try {
        let companyJobInfo = await JoblyAPI.getCompany(handle);
        let userProfile = await JoblyAPI.getUserProfile(username, token);
        setJobsApplied(userProfile.applications);
        debugger;
        setCompanyJobData(companyJobData => ({...companyJobData, ...companyJobInfo}));
        setIsLoading(false)
      } catch (err) {
        debugger;
        // Display error information
      }

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
      {companyJobData.jobs.map(job => (<JobCard key={job.id} job={job} username={username} token={token} jobsApplied={jobsApplied} />))}
    </Container>

  )

}

export default CompanyDetail; 