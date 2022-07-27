import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import * as Yup from 'yup';
import Screen from '../components/Screen';
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from '../components/forms';
import firebase from '../Api/FirebaseDatabase';
import authApi from '../Api/auth';
import useAuth from '../auth/useAuth';
import { CheckBox } from 'react-native-elements';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

function LoginScreen({ navigation }) {
  const auth = firebase.auth;
  const { login } = useAuth();
  const [error, setError] = useState(false);
  const [iconRedImage, setIconRedImage] = useState();

  useEffect(() => {
    const getImagesURI = async () => {
      setIconRedImage(await firebase.getAssetImage('logo-red.png'));
    };

    getImagesURI();
  }, []);

  const handleSubmit = async (userData) => {
    const response = await authApi.login(auth, userData);
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
      <Image style={styles.logo} source={{ uri: iconRedImage }} />
      <ErrorMessage error={error} visible={error} />
      <Form
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={validationSchema}
      >
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

        <SubmitButton title='Login' />
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
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
});

export default LoginScreen;
