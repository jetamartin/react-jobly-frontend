import React, {useState} from 'react'; 
import { Button, Form, Input, InputGroup, InputGroupAddon } from 'reactstrap';

const SearchForm = ({searchFunction}) => {
  const initialState ={};
  const [formData, setFormData ] = useState(initialState);


  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(data => ({
      ...data, 
      [name] : value
    }))
  }

  const submitForm = async (e) => {
    e.preventDefault();
    await searchFunction(formData.searchFilter);
    setFormData(initialState);
   }

  return (
    <div >
      <Form inline onSubmit={submitForm} className="mb-4 mt-4">
        <InputGroup>
          <Input 
            type="text" 
            name="searchFilter" 
            id="search" 
            placeholder="Enter Search Term..." 
            value={formData.searchFilter}
            // value={formData ? formData.searchFilter : null}
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