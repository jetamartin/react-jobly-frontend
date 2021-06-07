import React, {useState} from 'react'; 
import { Button, Form, Label, Input, InputGroup, InputGroupAddon } from 'reactstrap';

const SearchForm = ({searchCompanies}) => {
  const [formData, setFormData ] = useState("");
  const initialState = "";

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(data => ({
      ...data, 
      [name] : value
    }))
  }

  const submitForm = async (e) => {
    e.preventDefault();
    await searchCompanies(formData.name); 
    debugger;
    setFormData({});
  }

  return (
    <div >
      <Form inline onSubmit={submitForm} className="mb-4 mt-4">
        <InputGroup>
          <Input 
            type="text" 
            name="name" 
            id="search" 
            placeholder="Enter Search Term..." 
            value={formData.name}
            onChange={handleChange}
            />
          <InputGroupAddon addonType="append">
            <Button color="primary">Search</Button>
          </InputGroupAddon>
        </InputGroup>
      </Form> 
    </div>
  )

}

export default SearchForm;  