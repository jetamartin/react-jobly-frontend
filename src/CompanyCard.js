import React from 'react'; 
import {Link} from 'react-router-dom';
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import './CompanyCard.css';


const CompanyCard = ({company}) => {
  return (
    <Card className = "CompanyCard" key="company.id">
      <Link to={`/companies/${company.handle}`}>
        <CardBody className="CompanyCard-cardbody">
          <Row className="CompanyCard-header">
            <Col sm={8}>
                <CardTitle tag="h5">{company.name}</CardTitle>
            </Col>
            <Col className="CompanyCard-logo"  sm={4}>
              {console.log(company.logoUrl)}
              <img src={company.logoUrl} alt={company.name} />
            </Col>
          </Row>
          <CardText>{company.description}</CardText>
          </CardBody>
      </Link>
    </Card>
  )
}

export default CompanyCard; 