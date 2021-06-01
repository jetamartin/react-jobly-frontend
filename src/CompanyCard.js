import React from 'react'; 
import {Link} from 'react-router-dom';
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import './CompanyCard.css';

const CompanyCard = () => {
  return (

      <Card className = "CompanyCard">
      <Link to="/companies/anderson-arias-morrow" >
        <CardBody className="CompanyCard-cardbody">
          <Row className="CompanyCard-header">
            <Col sm={8}>
                <CardTitle tag="h5">Arnold, Berger and Townsend</CardTitle>
             </Col>
            <Col className="CompanyCard-logo"  sm={4}>
              <img src="../logos/company-logo-360-360.png" />
            </Col>

          </Row>

          <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
 
        </CardBody>

        </Link>
      </Card>
  )

}

export default CompanyCard; 