import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';
import { CheckBox } from 'react-native-elements';

import Screen from '../components/Screen';
import {
  Form,
  FormField,
  SubmitButton,
  ErrorMessage,
} from '../components/forms';
import firebase from '../Api/FirebaseDatabase';

import authApi from '../Api/auth';
import useAuth from '../auth/useAuth';

const validationSchema = Yup.object().shape({
  // name: Yup.string().required().label('Name'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

function RegisterScreen({ navigation }) {
  const [error, setError] = useState(false);
  const auth = firebase.auth;
  const { login } = useAuth();

  const handleSubmit = async (userData) => {
    const response = await authApi.register(auth, userData);

    if (response.accessToken) {
      setError(false);
      login(response.accessToken);
    } else {
      setError(response);
    }
  };
  const handleCheckBox = () => {
    navigation.navigate('Aggrement');
  };

  return (
    <Screen style={styles.container}>
      <ErrorMessage error={error} visible={error} />
      <Form
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={validationSchema}
      >
        {/* <FormField
          autoCorrect={false}
          icon='account'
          name='name'
          placeholder='Name'
        /> */}
        <FormField
          autoCapitalize='none'
          autoCorrect={false}
          icon='email'
          keyboardType='email-address'
          name='email'
          placeholder='Email'
          textContentType='emailAddress'
        />
        <FormField
          autoCapitalize='none'
          autoCorrect={false}
          icon='lock'
          name='password'
          placeholder='Password'
          secureTextEntry
          textContentType='password'
        />
        <SubmitButton title='Register' />
        <CheckBox
          title='I have read and agree the Terms and Conditions'
          checked={true}
          onPress={handleCheckBox}
        />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default RegisterScreen;
