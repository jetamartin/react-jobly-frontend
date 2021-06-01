import React from 'react'; 
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

import './JobCard.css';

const JobCard = () => {
  return (

      <Card className = "JobCard">
        <CardBody>
          <CardTitle tag="h5">Accountant, chartered certified</CardTitle>
          <CardText>Stone-Steward</CardText>
          <div>
            <small>Salary: 175,000</small>
          </div>
          <div>
            <small>Equity: 0</small>
          </div>
          <Button color="danger">Apply</Button>
        </CardBody>
      </Card>
  )

}

export default JobCard; 