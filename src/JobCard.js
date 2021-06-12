import React from 'react'; 
import NumberFormat from 'react-number-format';
import {
  Card, CardText, CardBody,
  CardTitle,  Button } from 'reactstrap';
import JoblyAPI from './JoblyAPI';

import './JobCard.css';


const JobCard = ({job, username, token, jobsApplied}) => {
// const [applied, setHasApplied] = useState(false); 
const numWithComma = (a) => {
  return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

  const handleApplyClick = async (e) => {
    const jobId = e.currentTarget.id;
    try {
      await JoblyAPI.applyForJob(username, jobId, token);
      const applyButton = document.getElementById(jobId);
      applyButton.innerHTML="Applied";
      applyButton.disabled=true;
      // setHasApplied(true);
    } catch (error) {
      console.log(error)
    }
  }
  return (



      <Card className = "JobCard" key="job.id">
        <CardBody>
          <CardTitle tag="h5">{job.title}</CardTitle>
          {job.companyHandle ?
          <CardText>{job.companyName}</CardText>
          : ""
          } 
          {job.salary ?
          <div>
            <small>
              Salary <NumberFormat value={job.salary} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </small>
            </div>
            : ""}
          <div>
            <small>Equity: {job.equity}</small>
          </div>
          {jobsApplied.includes(job.id) ?
          <Button id={job.id} color="danger" disabled>Applied</Button> 
          :
          <Button id={job.id} onClick={handleApplyClick} color="danger">Apply</Button>
          }
        </CardBody>
      </Card>
  )

}

export default JobCard; 