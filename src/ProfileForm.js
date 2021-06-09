import React, {useEffect, useState} from 'react'; 
import {Form, FormGroup, Label, Input, Button, Container, Card, CardBody} from "reactstrap";
import "./ProfileForm.css";
import JoblyAPI from './JoblyAPI';

const ProfileForm = ({userRegInfo, token, updateUserRegInfo, loginUser, username}) => {
 
  const INITIAL_STATE = {
    firstName: "",
    lastName: "",
    email: "",
    
  }
  
  const [ formData, setFormData ] = useState(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(true);
  const [ profileFormMsg, setProfileFormMsg] = useState({});

  const isEmptyObject = (obj) => {
    if (Object.keys(userRegInfo).length === 0 && userRegInfo.constructor === Object) {
       return true;
    } else {
      return false
    }
  }

  // Preload ProfileForm 
  useEffect(() => {
    // if no userRegInfo then request from server
    userRegInfo = JSON.parse(localStorage.getItem('userRegInfo'));

    if (userRegInfo === null || isEmptyObject(userRegInfo)) {
      const getUserInfo = async () => {
        // debugger;
          try {
            let results = await JoblyAPI.getUserProfile(username, token);
            // let results = await getUserRegInfo(username);
            debugger;
            setFormData(formData => ({...formData, ...results}))
            setIsLoading(false)
          } catch (err) {
            debugger;
            console.log(err)
            setProfileFormMsg({"error": err[0]});
          }
        }
        getUserInfo();
      } else {
        setFormData(formData => ({...formData, ...userRegInfo}))
        setIsLoading(false)
      }

  }, [username, token])
 


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
    const {firstName, lastName, email, password} = formData;
    debugger;
    try {
      await loginUser({username, password});
      await updateUserRegInfo(username, {firstName, lastName, email} );
      setFormData(formData => ({...formData, ...firstName, lastName, email }));
      debugger;
      setProfileFormMsg({status: "success", msg: "Profile was successfully changed"});
    } catch (err) {
      debugger;
      console.log(err)
      setProfileFormMsg({status: "error", msg: err[0]})
    }
  }

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }
 

  return (
    <Container className="ProfileForm col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <h2 className="mb-3">Profile</h2>
      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit}>

            <FormGroup>
              <Label htmlFor="username">User Name</Label>
              <p className="form-control-plaintext">{username}</p>
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
                required
                minLength="5" 
              />
            </FormGroup>
            {/* {Object.keys(profileFormMsg).length !== 0 ?  */}
            {isEmptyObject(profileFormMsg) ? 
              <div className={`ProfileForm-messages ${profileFormMsg.status === "success" ? "successMsg" : "errorMsg"}`}>
                {profileFormMsg.msg}
              </div>
            : ""}
            <Button color="primary">Submit</Button>
          </Form>
        </CardBody>
      </Card>

     
    </Container>

  )

}

export default ProfileForm; 