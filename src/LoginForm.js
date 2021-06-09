import React, {useState} from 'react'; 
import { useHistory } from 'react-router-dom';
import {Form, FormGroup, Label, Input, Button, Container, Card, CardBody} from "reactstrap";
import ErrorMsg from './ErrorMsg';
import "./LoginForm.css";

const LoginForm = ({loginUser}) => {
  // debugger;
  const history = useHistory();
  const initialState = {
    username: "",
    password: ""
  }
  const [formData, setFormData] = useState(initialState);
  const [ loginErrorFormMsg, setLoginErrorFormMsg] = useState([]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(data => ({
      ...data, 
      [name] : value
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    debugger;
    try {
      await loginUser(formData);
      setFormData(initialState);
      history.push("/companies");
    } catch (err) {
      setLoginErrorFormMsg(err)
      console.log(err)
    }
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
                required
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
                required
                minLength="5"  
              />
            </FormGroup>
            {loginErrorFormMsg.length !== 0 ?
              loginErrorFormMsg.map(errorMsg => <ErrorMsg errorMsg={errorMsg} />)
            : ""}
            <Button color="primary">Submit</Button>
          </Form>
        </CardBody>
      </Card>

     
    </Container>

  )

}

export default LoginForm; 