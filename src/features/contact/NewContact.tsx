import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styled from 'styled-components';
import Input from '../../components/Input'; // Importing your custom Input component
import Row from '../../components/Row';
import { useLocation, useNavigate, useParams } from '@tanstack/react-router';
import { Button } from '@mui/material';
import { createUser, editContact, fetchContactById } from '../../services/realmServices';
import { toast } from 'react-hot-toast';

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
  const navigate = useNavigate();
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
// console.log('formData', formData);

  const location = useLocation();
  const[hasChanged, setHasChanged] = useState(false);
  const isEditContact = location.pathname.split('/')[1] === 'editcontact';
  const {id} = useParams({ strict:false});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setHasChanged(true)
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  useEffect(() => {
    async function fetchContact() {
      if (isEditContact) {
        if (id === undefined) return;
        const data = await fetchContactById(id);
        console.log('data', data);
        setFormData(data);
      }
    }
    fetchContact();
  }, [isEditContact, id]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
     if (isEditContact) {
    e.preventDefault();
    if (id === undefined) return;
        if (!hasChanged) {
          // Display toast message and exit the function
          toast.error('Please Update any Changes to Save the Contact');
          return;
        }
    await editContact(id,formData);
     }else{
    e.preventDefault();
    console.log(formData);

    console.log('user...12345', formData);
    const id = await createUser(formData);
    console.log('id', id?.insertedId.toString());

    navigate({ to: `/createAppointment/${id?.insertedId.toString()}` });
     }
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
                checked={formData.gender === 'male'} // Determines if this option is selected
                onChange={handleChange}
              />
              <Input
                type="radio"
                name="gender"
                label="Female"
                value="female"
                checked={formData.gender === 'female'}
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
        <Row $contentposition="center">
          {/* <Link to={'/createAppointment'}> */}
          <Button
            variant="outlined"
            type="submit"
            sx={{
              color: 'white',
              backgroundColor: '#5A9EEE',
              fontWeight: '700',
              font: 'Helvetica',
              fontSize: '15px',
              borderRadius: '12px',
              width: '100px',
              height: '45px',
              ':hover': { backgroundColor: '#5A9EEE', color: 'white' },
            }}
          >
            {isEditContact ? 'Save' : 'Next'}
          </Button>
          {/* </Link> */}
        </Row>
      </form>
    </Container>
  );
}
