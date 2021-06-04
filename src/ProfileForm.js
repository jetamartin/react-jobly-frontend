import React, {useState} from 'react'; 
import {Form, FormGroup, Label, Input, Button, Container, Card, CardBody} from "reactstrap";
import "./ProfileForm.css";

// Need to get current user profile info if not stored
//  Most profile info available via user GET /users/:username
//  Maybe initiate call to get profile info when user clicks on NavBar.
//  Maybe we need a Profile component to hold that logic.   
// 
// How to confirm that password matches. Store in local store? State?
//  -- Need it to compare to change profile? 

// If password check is successful then need to issue a PATCH /users/:username
//  results of that need api need to be available in the form
// so that form values can be updated to reflect the changes
// and a success message needs to be issued on Profile form.
// No redirect required after successful profile.
//  

const ProfileForm = ({userRegInfo, updateUserInfo}) => {
  debugger;
  
  const INITIAL_STATE = {
    firstName: "",
    lastName: "",
    email: "",
    confirmPassword: ""
  }
  const [ formData, setFormData ] = useState(userRegInfo)

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(data => ({
      ...data, 
      [name] : value
    }))
  }

  const handleSubmit = async (e) => {
    debugger;
    e.preventDefault();
    console.log(formData);
    let user = await updateUserInfo(userRegInfo.username, formData);
    debugger;
    setFormData(formData => ({...formData, ...user }))

  }
 

  return (
    <Container className="ProfileForm col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <h2 className="mb-3">Profile</h2>
      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit}>

            <FormGroup>
              <Label htmlFor="username">User Name</Label>
              <p className="form-control-plaintext">{userRegInfo.username}</p>
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
                type="email" 
                name="email"
                id="email"
 
                value={formData.email}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="confirmPassword">Confirm Password to Make Changes</Label>
              <Input 
                type="password" 
                name="password" 
                id="comfirmPassword"
                value={formData.confirmPassword}
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