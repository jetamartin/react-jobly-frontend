import React, {useState} from 'react'; 
import {Form, FormGroup, Label, Input, Button, Container, Card, CardBody} from "reactstrap";
import {useHistory} from 'react-router-dom'; 
import "./SignUpForm.css";


const SignUpForm = ({registerUser}) => {
  const history = useHistory();
  const INITIAL_STATE = {
    username: "",
    password: "",
    firstName: "",
    lastName: "", 
    email: ""
  }
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(data => ({
      ...data, 
      [name] : value
    }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault(); 
    registerUser(formData);
    setFormData(INITIAL_STATE)
    history.push('/companies');
  }
  return (
    <Container className="SignUpForm col-5 ">
      <h2 className="mb-3">SignUp</h2>
      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="username">User Name</Label>
              <Input 
                type="text" 
                name="username" 
                id="username"
                value={formData.username}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input 
                type="password" 
                name="password" 
                id="password"
                value={formData.password}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="firstName">First Name</Label>
              <Input 
                type="text"
                name="firstName" 
                id="firstName"
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
                value={formData.lastName}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input 
                type="text"
                name="email"
                id="email"
                value={formData.email}
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

export default SignUpForm; 