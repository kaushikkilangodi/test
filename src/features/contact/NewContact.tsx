import { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import Input from '../../components/Input'; // Importing your custom Input component
import Row from '../../components/Row';
import { useLocation} from '@tanstack/react-router';
import { Button } from '@mui/material';
import { createUser } from '../../services/realmServices';


interface FormData {
  name: string;
  phone: string;
  gender: string;
  dob: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  pinCode: string;
}

const Container = styled.div`
  width: 100%;
`;
const Content = styled.div`
  margin: 20px 0;
  font-size: 20px;
  color: #000;
`;

export default function NewContact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    gender: '',
    dob: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    pinCode: '',
  });

  // const history = useHistory();
  const location = useLocation();

  const isEditContact = location.pathname.includes('editcontact');

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
    // Save the formData to your backend or storage mechanism
    // After successful save, you can redirect to another page
    // For example, redirect to the editcontact page
  
    console.log("user...12345",formData);
    createUser(formData);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          label="Name"
          required
        />
        <Input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          label="Phone Number"
         
        />
        <Content>
          <Row type="vertical">
            <Row size="xxLarge" type="horizontal" $contentposition="center">
              Gender:
              <Input
                type="radio"
                name="gender"
                label="Male"
                value="male"
                onChange={handleChange}
              
              />
              <Input
                type="radio"
                name="gender"
                label="Female"
                value="female"
                onChange={handleChange}
          
              />
            </Row>
          </Row>
        </Content>
        <Input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          label="Date of Birth"
        />
        <Input
          type="text"
          name="addressLine1"
          value={formData.addressLine1}
          onChange={handleChange}
          label="Address Line 1"
        />
        <Input
          type="text"
          name="addressLine2"
          value={formData.addressLine2}
          onChange={handleChange}
          label="Address Line 2"
        />
        <Input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          label="City"
        />
        <Input
          type="text"
          name="pinCode"
          value={formData.pinCode}
          onChange={handleChange}
          label="Pin Code"
        />
        <Row $contentposition='center'>
          {/* <Link to={'/createAppointment'}> */}
            <Button variant="outlined"
            type="submit"
          sx={{
            color: 'white',
            backgroundColor: '#5A9EEE',
            fontWeight: '700',
            font:'Helvetica',
            fontSize:'15px',
            borderRadius: '12px',
            width:'100px',
            height:'45px',
            ':hover': { backgroundColor: '#5A9EEE', color: 'white' },
          }}>{isEditContact ? 'Save' : 'Next'}</Button>
          {/* </Link> */}
        </Row>
      </form>
    </Container>
  );
}
