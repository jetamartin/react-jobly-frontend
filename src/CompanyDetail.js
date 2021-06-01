import React from 'react'; 
import {Link} from 'react-router-dom';
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import './CompanyDetail.css';

const CompanyDetail = () => {
  return (
    <Container className="col-8 pt-5">
      <h4>Anderson, Arias and Morrow</h4>
      <p>Somebody program how I. Face give away discussion view act inside. Your official relationship administration here</p>
      {/* Get all jobs openings for this company
      Map through all return jobs <Jobcard>. that match this employer  */}
     
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
    </Container>

  )

}

export default CompanyDetail; 