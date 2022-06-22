import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Card from '../components/Card';
import colors from '../config/colors';
import Screen from '../components/Screen';
import lingstingApi from '../Api/listing';
import { collection, onSnapshot } from '@firebase/firestore';
import firebase from '../Api/FirebaseDatabase';

function ListingsScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const doneItemsRef = collection(firebase.db, 'doneItems');

  const fetchListing = async () => {
    const response = await lingstingApi.getListing();
    if (response) {
      setData(response);
    }
  };

  useEffect(() => {
    fetchListing();
    const unsubscribe = onSnapshot(doneItemsRef, (doneItemsSnapshot) => {
      const result = doneItemsSnapshot.docs.map((doc) => ({ ...doc.data() }));
      setData(result);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Screen style={styles.screen}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <Card
            title={item.label}
            subTitle={item.price}
            image={item.listingImageURL}
            onPress={() => navigation.navigate('ListingDetails', item)}
          />
        )}
        refreshing={refreshing}
        onRefresh={() => {
          console.log('refresh');
          fetchListing();
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
