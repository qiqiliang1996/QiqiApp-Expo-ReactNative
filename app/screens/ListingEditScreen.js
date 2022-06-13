import React, { useState } from 'react';
import { StyleSheet, ActivityIndicator, Alert } from 'react-native';
import * as Yup from 'yup';
import FormImagePicker from '../components/forms/FormImagePicker';
import lingstingApi from '../Api/listing';

import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from '../components/forms';
import CategoryPickerItem from '../components/CategoryPickerItem';
import Screen from '../components/Screen';
import imagesApi from '../Api/imagesApi';

const validationSchema = Yup.object().shape({
  images: Yup.array().min(1, 'Please select at least one image'),
  label: Yup.string().required().min(1).label('Label'),
  price: Yup.number().required().min(1).max(10000).label('Price'),
  description: Yup.string().required().label('Description'),
  category: Yup.object().required().nullable().label('Category'),
});

const categories = [
  {
    backgroundColor: '#fc5c65',
    icon: 'floor-lamp',
    label: 'Furniture',
    value: 1,
  },
  {
    backgroundColor: '#fd9644',
    icon: 'car',
    label: 'Cars',
    value: 2,
  },
  {
    backgroundColor: '#fed330',
    icon: 'camera',
    label: 'Cameras',
    value: 3,
  },
  {
    backgroundColor: '#26de81',
    icon: 'cards',
    label: 'Games',
    value: 4,
  },
  {
    backgroundColor: '#2bcbba',
    icon: 'shoe-heel',
    label: 'Clothing',
    value: 5,
  },
  {
    backgroundColor: '#45aaf2',
    icon: 'basketball',
    label: 'Sports',
    value: 6,
  },
  {
    backgroundColor: '#4b7bec',
    icon: 'headphones',
    label: 'Movies & Music',
    value: 7,
  },
  {
    backgroundColor: '#a55eea',
    icon: 'book-open-variant',
    label: 'Books',
    value: 8,
  },
  {
    backgroundColor: '#778ca3',
    icon: 'application',
    label: 'Other',
    value: 9,
  },
];

function ListingEditScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, formikBag) => {
    //
    //upload image to firebase storage
    await imagesApi('images', values);
    //
    //upload the new listing to firebase database
    await lingstingApi.addListing(values, formikBag);
    setLoading(false);
    Alert.alert(
      'Upload Successfully',
      'Do you want to go to Home page? Dont forget to refresh the page by dragging down the screen',
      [
        {
          text: 'Yes',
          onPress: () => {
            navigation.navigate('Feed');
          },
        },
        {
          text: 'No',
          onPress: () => {
            console.log('stay with same page');
          },
        },
      ]
    );
  };

  return (
    <>
      <Screen style={styles.container}>
        <Form
          initialValues={{
            label: '',
            price: '',
            description: '',
            category: null,
            images: [],
          }}
          onSubmit={(values, formikBag) => {
            setLoading(true);
            handleSubmit(values, formikBag);
          }}
          validationSchema={validationSchema}
        >
          <FormImagePicker name='images' />
          <FormField
            maxLength={255}
            name='label'
            placeholder='Label'
            width='100%'
          />
          <FormField
            keyboardType='numeric'
            maxLength={8}
            name='price'
            placeholder='Price'
            width='100%'
          />
          <Picker
            items={categories}
            name='category'
            numberOfColumns={3}
            PickerItemComponent={CategoryPickerItem}
            placeholder='Category'
            width='100%'
          />
          <FormField
            maxLength={255}
            multiline
            name='description'
            numberOfLines={3}
            placeholder='Description'
            width='100%'
          />
          <SubmitButton title='Post' />
        </Form>
        <ActivityIndicator
          animating={loading}
          size='large'
          style={{ marginTop: 50 }}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default ListingEditScreen;
