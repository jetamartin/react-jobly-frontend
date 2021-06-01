import React from 'react'; 
import {Link} from 'react-router-dom';
import { Button, Form, Label, Input, InputGroup, InputGroupAddon } from 'reactstrap';

const SearchForm = (props) => {
  const submitForm = () => {
    alert("Search Form Submitted")
  }

  return (
    <div >
      <Form inline onSubmit={submitForm} className="mb-4 mt-4">
        <InputGroup>
          <Input type="text" name="search" id="search" placeholder="Enter Search Term..." />
          <InputGroupAddon addonType="append">
            <Button color="primary">Search</Button>
          </InputGroupAddon>
        </InputGroup>
      </Form> 
    </div>
  )

}

export default SearchForm;  