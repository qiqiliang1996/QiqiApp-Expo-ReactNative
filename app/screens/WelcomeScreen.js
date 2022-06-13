import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, View, Image, Text } from 'react-native';
import Button from '../components/Button';
import firebase from '../Api/FirebaseDatabase';

function WelcomeScreen({ navigation }) {
  const [backgroundImage, setBackgroundImage] = useState();
  const [iconRedImage, setIconRedImage] = useState();

  useEffect(() => {
    const getImagesURI = async () => {
      setBackgroundImage(await firebase.getAssetImage('background.jpg'));
      setIconRedImage(await firebase.getAssetImage('logo-red.png'));
    };

    getImagesURI();

    return () => {
      getImagesURI();
    };
  }, []);

  const handleLogin = () => {
    navigation.navigate('Login');
  };
  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={{ uri: backgroundImage }}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={{ uri: iconRedImage }} />
        <Text style={styles.tagline}>Sell What You Don't Need</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button title='Login' onPress={handleLogin} />
        <Button title='Register' color='secondary' onPress={handleRegister} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonsContainer: {
    bottom: 20,
    padding: 20,
    width: '100%',
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    position: 'absolute',
    top: 70,
    alignItems: 'center',
  },
  tagline: {
    fontSize: 25,
    fontWeight: '600',
    paddingVertical: 20,
  },
});

export default WelcomeScreen;
