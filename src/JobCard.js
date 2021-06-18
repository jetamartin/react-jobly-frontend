import React, { useState} from 'react'; 
import NumberFormat from 'react-number-format';
import {
  Card, CardText, CardBody,
  CardTitle,  Button } from 'reactstrap';
import JoblyAPI from './JoblyAPI';

import './JobCard.css';

const JobCard = ({job, username, token, jobsApplied}) => {
  // local state to keep track of did you apply and default to whatever jobsApplied says
  const [didApply, setDidApply] = useState(jobsApplied.includes(job.id));

  const handleApplyClick = async (e) => {
    const jobId = e.currentTarget.id;
    try {
      await JoblyAPI.applyForJob(username, jobId, token);
      setDidApply(true)
    } catch (error) {
      setDidApply(false)
      console.log(error)
    }
  }
  return (
      <Card className = "JobCard" key="job.id">
        <CardBody>
          <CardTitle tag="h5">{job.title}</CardTitle>
          {job.companyHandle && <CardText>{job.companyName}</CardText>}

          {job.salary &&
          <div>
            <small>
              Salary <NumberFormat value={job.salary} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </small>
            </div>
          }
          <div>
            <small>Equity: {job.equity}</small>
          </div>
          {/* if disabled is true then it will not trigger the onClick */}
          <Button id={job.id} onClick={handleApplyClick} color="danger" disabled={didApply}>{didApply ? "Applied" : "Apply"}</Button>
        </CardBody>
      </Card>
  )

}

export default JobCard; 