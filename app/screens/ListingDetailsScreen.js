import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import colors from '../config/colors';
import ListItem from '../components/lists/ListItem';
import Text from '../components/Text';
import useAuth from '../auth/useAuth';
import firebase from '../Api/FirebaseDatabase';
import Screen from '../components/Screen';

function ListingDetailsScreen({ route }) {
  const item = route.params;
  const { user } = useAuth();
  const [iconRedImage, setIconRedImage] = useState();

  useEffect(() => {
    const getImagesURI = async () => {
      setIconRedImage(await firebase.getAvatarImage(user.email));
    };

    getImagesURI();
  }, []);

  return (
    <>
      <Screen style={styles.screen}>
        <View>
          <Image style={styles.image} source={{ uri: item.listingImageURL }} />
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>{item.label}</Text>
            <Text style={styles.price}>${item.price}</Text>
            <View style={styles.userContainer}>
              <ListItem
                image={{ uri: iconRedImage }}
                title={user.displayName}
                subTitle='Welcome to detail page'
              />
            </View>
          </View>
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    marginTop: 5,
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
  },
  price: {
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
  },
  userContainer: {
    marginVertical: 40,
  },
});

export default ListingDetailsScreen;
