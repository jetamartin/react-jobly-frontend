import React from 'react'; 
import {Link} from 'react-router-dom';
import {
  Card, CardText, CardBody,  CardTitle} from 'reactstrap';
import { Row, Col } from 'reactstrap';
import genericLogo from './genericLogo.png';
import './CompanyCard.css';


const CompanyCard = ({company}) => {

  // if the company.logoUrl value provided is null then fall back to the genericLogo value
  const logoUrl = company.logoUrl || genericLogo;

  return (
    <Card className = "CompanyCard" key="company.id">
      <Link to={`/companies/${company.handle}`}>
        <CardBody className="CompanyCard-cardbody">
          <Row className="CompanyCard-header">
            <Col sm={8}>
                <CardTitle tag="h5">{company.name}</CardTitle>
            </Col>
            <Col className="CompanyCard-logo"  sm={4}>
              {/* if frontend doesn't have the specified logo (e.g., /logos/logo2.png) then sub genericLogo in public folder */}
              <img 
                src={logoUrl}
                alt={company.name}
                // onError={(e)=>{e.target.onerror = null; e.target.src="/logos/genericLogo.png"}}
                />
            </Col>
          </Row>
          <CardText>{company.description}</CardText>
          </CardBody>
      </Link>
    </Card>
  )
}

export default CompanyCard; 