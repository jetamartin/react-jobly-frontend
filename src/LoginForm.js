import React, {useState} from 'react'; 
import { useHistory } from 'react-router-dom';
import {Form, FormGroup, Label, Input, Button, Container, Card, CardBody} from "reactstrap";
import "./LoginForm.css";

const LoginForm = ({loginUser}) => {
  const history = useHistory();
  const initialState = {
    username: "",
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
    loginUser(formData);
    setFormData(initialState);
    history.push("/companies");
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
            <Button color="primary">Submit</Button>
          </Form>
        </CardBody>
      </Card>

     
    </Container>

  )

}

export default LoginForm; 