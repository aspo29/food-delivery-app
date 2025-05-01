import { PAYMENT_METHODS } from '@/utils/constants';
import {Card} from '@mui/material';
import { CheckboxGroupInput, required, SimpleForm, TextInput, TimeInput, useNotify } from 'react-admin';

import { SaveButton, Toolbar } from 'react-admin';
import{ db } from '@/utils/firebase';
import { doc,setDoc ,getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const NoDeleteToolbar = () => (
  <Toolbar>
    <SaveButton />
  </Toolbar>
);

export const Info = () => {
    const notify =useNotify();
    const resturantsRef = doc(db, 'restaurant', 'info');
    const [defaultValues ,setDefaultValues] = useState<any>();
      
    const handleSubmit = async(data: any) => {
        await setDoc(resturantsRef, data);
        notify('Restaurant info updated successfully', { type: 'info' });
    };

const fetchData = async () => {
    const docSnap = await getDoc(resturantsRef);
    setDefaultValues(docSnap.data() || {});
}

useEffect(() => {
    fetchData();
}, []);

if (!defaultValues) {
    return null; // or a loading spinner
}

  return (
    <Card sx={{ padding: 2, margin: 2 }}>
        <SimpleForm defaultValues={{
            ...defaultValues,
            openingTime: defaultValues.openingTime?.toDate(),
            closingTime: defaultValues.closingTime?.toDate(),
            }} resource="info" toolbar={<NoDeleteToolbar />} sanitizeEmptyValues onSubmit={handleSubmit}>
        <TextInput source="name"  fullWidth />
        <TextInput source="address" validate={[required()]} fullWidth />
        <TextInput source="phone" validate={[required()]} fullWidth />
        <TimeInput source="openingTime" label="Open Time" fullWidth />
        <TimeInput source="closingTime" label="Close Time" fullWidth />
        <CheckboxGroupInput source='paymentMethods' label='Payment Methods' fullWidth choices={PAYMENT_METHODS} />
        </SimpleForm>
    </Card>
  );
}