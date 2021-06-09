import React, {useState} from 'react'; 
import {Form, FormGroup, FormText, Label, Input, Button, Container, Card, CardBody} from "reactstrap";
import {useHistory} from 'react-router-dom'; 

import ErrorMsg from './ErrorMsg';
import "./SignUpForm.css";

// var msg = TestString.replace(/instance:/g, "");

const cleanErrorMsgs = (errors) => {
  return errors.map(error => error.replace(/instance./g, ""));
}
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
  const [ signUpErrorFormMsg, setSignUpErrorFormMsg] = useState([]);
  
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(data => ({
      ...data, 
      [name] : value
    }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      await registerUser(formData);
      setFormData(INITIAL_STATE)
      history.push('/companies');
    } catch (err) {
      debugger; 
      console.log(err)
      let cleanedErrorMessages = cleanErrorMsgs(err)
      debugger
      setSignUpErrorFormMsg(cleanedErrorMessages)
    }

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
                // required
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
                // required
                // minLength="5"
              />
              <FormText>Minimum of 6 characters</FormText>

            </FormGroup>
            <FormGroup>
              <Label htmlFor="firstName">First Name</Label>
              <Input 
                type="text"
                name="firstName" 
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                // required
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
                // required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input 
                // pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
                type="text"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="johnDoe@xyzmail.com"
                // required
                // minLength="6"
              />
              <FormText>Minimum of 6 characters</FormText>
            </FormGroup>
            {signUpErrorFormMsg.length !== 0 ?
              signUpErrorFormMsg.map(errorMsg => <ErrorMsg errorMsg={errorMsg} />)
            : ""}
            <Button color="primary">Submit</Button>
          </Form>
        </CardBody>
      </Card>
     
    </Container>
  )

}

export default SignUpForm; 