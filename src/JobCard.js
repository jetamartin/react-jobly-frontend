import React, { useEffect, useRef, useState } from 'react'; 
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import JoblyAPI from './JoblyAPI';

import './JobCard.css';


const JobCard = ({job, username, token, jobsApplied}) => {
const [applied, setHasApplied] = useState(false); 

  const handleApplyClick = async (e) => {
    debugger;
    const jobId = e.currentTarget.dataset.id;
    try {
      let applicationStatus = await JoblyAPI.applyForJob(username, jobId, token);
      const button = document.querySelector(`#${jobId}`);
      debugger;
      setHasApplied(true);
    } catch (error) {
      console.log(error)
      debugger;
    }
  }
  debugger;
  return (

      <Card className = "JobCard" key="job.id">
        <CardBody>
          <CardTitle tag="h5">{job.title}</CardTitle>
          {console.log(job.companyName)}
          {job.companyHandle ?
          <CardText>{job.companyName}</CardText>
          : ""
          } 
          <div>
            <small>Salary {job.salary}</small>
          </div>
          <div>
            <small>Equity: {job.equity}</small>
          </div>
          {jobsApplied.includes(job.id) ?
          <Button data-id={job.id} color="danger" disabled>Applied</Button> 
          :
          <Button data-id={job.id} onClick={handleApplyClick} color="danger">Apply</Button>
          }
        </CardBody>
      </Card>
  )

}

export default JobCard; 