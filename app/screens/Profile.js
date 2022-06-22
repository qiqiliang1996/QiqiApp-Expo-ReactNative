import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  Image,
} from 'react-native';
import Screen from '../components/Screen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import firebase from '../Api/FirebaseDatabase';
import { updateProfile } from '@firebase/auth';
import {
  doc,
  setDoc,
  collection,
  onSnapshot,
  query,
  where,
} from '@firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import colors from '../config/colors';
import AuthContext from '../auth/context';

export default function Profile({ navigation }) {
  const { user, setUser } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const auth = firebase.auth;

  const authUser = auth.currentUser;
  const profileRef = query(
    collection(firebase.db, 'users'),
    where('uid', '==', user.user_id)
  );

  useEffect(() => {
    // requestPermission();

    const unsubscribe = onSnapshot(profileRef, (profileSnapshot) => {
      const result = profileSnapshot.docs.map((doc) => ({ ...doc.data() }));

      if (result[0]) {
        setUser({ ...user, displayName: result[0].displayName });
      }
    });
    return () => unsubscribe();
  }, []);

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      alert(
        'We will utilize photos for this app development purposes only. For example: profile picture and listing details. Therefore, permission to access camera roll is required!'
      );
      return;
    }
  };

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync();

    return result;
  }

  async function handlePress() {
    let photoURL;
    if (selectedImage) {
      const { url } = await uploadImage(
        selectedImage,
        `images/userProfileImages/${user.email}`,
        'profilePicture'
      );
      photoURL = url;
    }

    const userData = {
      displayName,
      email: user.email,
    };
    if (photoURL) {
      userData.photoURL = photoURL;
    }

    try {
      const result = await setDoc(doc(firebase.db, 'users', user.user_id), {
        ...userData,
        uid: user.user_id,
      });
    } catch (error) {
      console.log(error, 'error on upload users profile to users collection');
    }

    await Promise.all([
      updateProfile(authUser, userData),
      setDoc(doc(firebase.db, 'users', user.user_id), {
        ...userData,
        uid: user.user_id,
      }),
    ]);
  }

  async function uploadImage(uri, path, fName) {
    console.log('uploadImage called? 333', uri, path, fName);

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e, 'error for uploading profile photo');
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const fileName = fName || nanoid();

    const imageRef = ref(firebase.storage, `${path}/${fileName}.jpeg`);

    const snapshot = await uploadBytes(imageRef, blob, {
      contentType: 'image/jpeg',
    });

    blob.close();

    const url = await getDownloadURL(snapshot.ref);

    return { url, fileName };
  }

  async function handleProfilePicture() {
    const result = await pickImage();
    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  }
  return (
    <Screen>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,

          padding: 20,
        }}
      >
        <Text style={{ fontSize: 22 }}>Profile Info</Text>
        {/* <Text style={{ fontSize: 14 }}>
          Please provide your name and an optional profile photo
        </Text> */}
        {/* <TouchableOpacity
          onPress={handleProfilePicture}
          style={{
            marginTop: 30,
            borderRadius: 120,
            width: 120,
            height: 120,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {!selectedImage ? (
            <MaterialCommunityIcons name='camera-plus' color='grey' size={45} />
          ) : (
            <Image
              source={{ uri: selectedImage }}
              style={{ width: '100%', height: '100%', borderRadius: 120 }}
            />
          )}
        </TouchableOpacity> */}
        <TextInput
          placeholder='Type your name'
          value={displayName}
          onChangeText={setDisplayName}
          style={{
            borderBottomColor: 'grey',
            marginTop: 40,
            borderBottomWidth: 2,
            width: '100%',
          }}
        />
        <View style={{ width: 80, marginTop: 30 }}>
          <Button
            title='Next'
            color={colors.primary}
            onPress={handlePress}
            disabled={!displayName}
          />
        </View>
      </View>
    </Screen>
  );
}
