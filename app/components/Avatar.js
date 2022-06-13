import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import firebase from '../Api/FirebaseDatabase';

export default function Avatar({ size, user }) {
  const [avatarImage, setAvatarImage] = useState();
  useEffect(() => {
    const getImagesURI = async () => {
      setAvatarImage(await firebase.getAvatarImage(user.email));
    };

    getImagesURI();
  }, []);
  return (
    <Image
      style={{
        width: size,
        height: size,
        borderRadius: size,
      }}
      source={user.photoURL ? { uri: user.photoURL } : { uri: avatarImage }}
      resizeMode='cover'
    />
  );
}
