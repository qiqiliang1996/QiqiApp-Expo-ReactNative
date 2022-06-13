import { collection, onSnapshot, query, where } from '@firebase/firestore';
import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import GlobalContext from '../contexts/GlobalContext';
import firebase from '../Api/FirebaseDatabase';
import ContactsFloatingIcon from '../components/ContactsFloatingIcon';
import ContactListItem from '../components/ContactListItem';
import useContacts from '../hooks/useContact';

export default function Chats() {
  const { currentUser } = firebase.auth;
  const { rooms, setRooms, setUnfilteredRooms } = useContext(GlobalContext);
  const contacts = useContacts();

  //第一步：找出所有 有本人存在的rooms
  const chatsQuery = query(
    collection(firebase.db, 'rooms'),
    where('participantsArray', 'array-contains', currentUser.email)
  );
  useEffect(() => {
    const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
      const parsedChats = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        userB: doc
          .data()
          .participants.find((p) => p.email !== currentUser.email),
      }));
      setUnfilteredRooms(parsedChats);
      setRooms(parsedChats.filter((doc) => doc.lastMessage));
    });
    return () => unsubscribe();
  }, []);

  function getUserB(user, contacts) {
    const userContact = contacts.find((c) => c.email === user.email);
    if (userContact && userContact.contactName) {
      return { ...user, contactName: userContact.contactName };
    }
    return user;
  }

  return (
    <>
      <View style={{ flex: 1, padding: 5, paddingRight: 10 }}>
        {rooms.map((room) => (
          <ContactListItem
            type='chat'
            description={room.lastMessage.text}
            key={room.id}
            room={room}
            time={room.lastMessage.createdAt}
            user={getUserB(room.userB, contacts)}
          />
        ))}
        <ContactsFloatingIcon />
      </View>
    </>
  );
}
