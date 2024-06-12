import { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import Input from '../../components/Input'; // Importing your custom Input component
import { Button } from '@mui/material';
import Row from '../../components/Row';

interface FormData {
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  pinCode: string;
}

const Container = styled.div`
  width: 100%;
  padding: 10px;
`;

export default function NewContact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    pinCode: '',
  });
  const handleSave = () => {
    localStorage.setItem('formData', JSON.stringify(formData));
    window.location.href = '/';
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    e.currentTarget.reset();
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Enter Name Here"
          value={formData.name}
          onChange={handleChange}
          label="Name"
          required
        />
        <Input
          type="tel"
          name="phone"
          placeholder="Enter Phone No Here"
          value={formData.phone}
          onChange={handleChange}
          label="Phone Number"
          required
        />

        <Input
          type="text"
          name="addressLine1"
          placeholder="Enter Address Line 1 Here"
          value={formData.addressLine1}
          onChange={handleChange}
          label="Address Line 1"
        />
        <Input
          type="text"
          name="addressLine2"
          placeholder="Enter Address Line 2 Here"
          value={formData.addressLine2}
          onChange={handleChange}
          label="Address Line 2"
        />
        <Input
          type="text"
          name="city"
          placeholder="Enter City Name Here"
          value={formData.city}
          onChange={handleChange}
          label="City"
        />
        <Input
          type="text"
          name="pinCode"
          placeholder="Enter pincode Here"
          value={formData.pinCode}
          onChange={handleChange}
          label="Pin Code"
        />
        <Row $contentposition="center">
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{ color: 'white' }}
          >
            Save
          </Button>
        </Row>
      </form>
    </Container>
  );
}
