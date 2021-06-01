import React, {useState} from 'react'; 
import {Form, FormGroup, Label, Input, Button, Container, Card, CardBody} from "reactstrap";
import "./LoginForm.css";

const LoginForm = ({loginUser}) => {
  const initialState = {
    userName: "",
    password: ""
  }
  const [formData, setFormData] = useState(initialState);
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(data => ({
      ...data, 
      [name] : value
    }))
  }
  const handleSubmit = e => {
    e.preventDefault();
    debugger;
    console.log(formData);
    alert("Login Form submitted");
    // loginUser(formData)
    setFormData(initialState)
  }

  return (
    <Container className="LoginForm col-md-4">
      <h2 className="mb-3">Log In</h2>
      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit}>
          <FormGroup>
              <Label htmlFor="userName">User Name</Label>
              <Input 
                type="text"
                name="userName"
                id="userName"
                value={formData.userName}
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
            <Button color="primary">Submit</Button>
          </Form>
        </CardBody>
      </Card>

     
    </Container>

  )

}

export default LoginForm; 