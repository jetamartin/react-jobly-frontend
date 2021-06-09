import React from 'react'; 
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

import './JobCard.css';

const JobCard = ({job}) => {
  return (

      <Card className = "JobCard" key="job.id">
        <CardBody>
          <CardTitle tag="h5">{job.title}</CardTitle>
          <CardText>{job.title}</CardText>
          <div>
            <small>Salary {job.salary}</small>
          </div>
          <div>
            <small>Equity: {job.equity}</small>
          </div>
          <Button color="danger">Apply</Button>
        </CardBody>
      </Card>
  )

}

export default JobCard; 