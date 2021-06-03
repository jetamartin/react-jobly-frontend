import React, {useState} from 'react'; 
import {Form, FormGroup, Label, Input, Button, Container, Card, CardBody} from "reactstrap";
import "./ProfileForm.css";

const ProfileForm = ({userRegInfo}) => {
  debugger;
  const INITIAL_STATE = {
  }
  const [ formData, setFormData ] = useState({})

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(data => ({
      ...data, 
      [name] : value
    }))
  }

  const handleSubmit = e => {
    e.preventDefault();
    alert('Profile form submitted')
    
  }
 

  return (
    <Container className="ProfileForm col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <h2 className="mb-3">Profile</h2>
      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="userName">User Name</Label>
              <Input 
                defaultValue={userRegInfo.username}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="firstName">First Name</Label>
              <Input 
                type="text" 
                name="firstName" 
                id="firstName" 
                defaultValue={userRegInfo.firstName}
                value={formData.firstName}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="lastName">Last Name</Label>
              <Input 
                type="text"
                name="lastName"
                id="lastName"
                defaultValue={userRegInfo.lastName}
                value={formData.lastName}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input 
                type="email" 
                name="email"
                id="email"
                defaultValue={userRegInfo.email}
                value={formData.email}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Confirm Password to Make Changes</Label>
              <Input 
                type="password" 
                name="password" 
                id="password"
                value={formData.password}
                onChange={handleChange} 
              />
            </FormGroup>
            <Button color="primary">Submit</Button>
          </Form>
        </CardBody>
      </Card>

     
    </Container>

  )

}

export default ProfileForm; 