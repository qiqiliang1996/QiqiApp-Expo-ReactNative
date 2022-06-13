import React, { useContext, useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import GlobalContext from '../contexts/GlobalContext';
import useContacts from '../hooks/useContact';
import { FlatList, Text } from 'react-native';
import { collection, onSnapshot, query, where } from '@firebase/firestore';
import ContactListItem from '../components/ContactListItem';
import firebase from '../Api/FirebaseDatabase';
import Screen from '../components/Screen';

function ContactScreen() {
  const contacts = useContacts(); //array of object, [{contactName,email}]
  const route = useRoute();
  const image = route.params && route.params.image;

  return (
    <>
      <Screen>
        <FlatList
          style={{ flex: 1, padding: 10 }}
          data={contacts}
          keyExtractor={(_, i) => i}
          renderItem={({ item }) => (
            <ContactPreview contact={item} image={image} />
          )}
        />
      </Screen>
    </>
  );
}

function ContactPreview({ contact, image }) {
  const { unfilteredRooms, rooms } = useContext(GlobalContext);
  const [user, setUser] = useState(contact);

  useEffect(() => {
    const q = query(
      collection(firebase.db, 'users'),
      where('email', '==', contact.email)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.docs.length) {
        const userDoc = snapshot.docs[0].data();
        setUser((prevUser) => ({ ...prevUser, userDoc }));
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <ContactListItem
      style={{ marginTop: 7 }}
      type='contacts'
      user={user}
      image={image}
      room={unfilteredRooms.find((room) =>
        room.participantsArray.includes(contact.email)
      )}
    />
  );
}

export default ContactScreen;
