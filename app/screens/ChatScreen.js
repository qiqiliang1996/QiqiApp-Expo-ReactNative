// @refresh reset

import 'react-native-get-random-values';
import { nanoid } from 'nanoid';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import firebase from '../Api/FirebaseDatabase';
import GlobalContext from '../contexts/GlobalContext';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from '@firebase/firestore';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import AuthContext from '../auth/context';
import BugsnagLogger from '../utilities/logger';

export default function Chat({ route }) {
  const [roomHash, setRoomHash] = useState('');
  const [messages, setMessages] = useState([]);
  const { colors, unfilteredRooms } = useContext(GlobalContext);
  const { user: currentUser } = useContext(AuthContext);

  const { image: selectedImage, user: userB } = route.params;

  const room = unfilteredRooms.find((room) =>
    room.participantsArray.includes(userB.email)
  );

  const senderUser = currentUser.photoURL
    ? {
        name: currentUser.displayName,
        _id: currentUser.user_id,
        avatar: currentUser.photoURL,
      }
    : { name: currentUser.displayName, _id: currentUser.user_id };

  const roomId = room ? room.id : nanoid();

  const roomRef = doc(firebase.db, 'rooms', roomId);

  const roomMessagesRef = collection(firebase.db, 'rooms', roomId, 'messages');

  useEffect(() => {
    (async () => {
      if (!room) {
        const currUserData = {
          displayName: currentUser.displayName,
          email: currentUser.email,
        };
        if (currentUser.photoURL) {
          currUserData.photoURL = currentUser.photoURL;
        }
        const userBData = {
          displayName: userB.contactName || userB.displayName || '',
          email: userB.email,
        };
        if (userB.photoURL) {
          userBData.photoURL = userB.photoURL;
        }
        const roomData = {
          participants: [currUserData, userBData],
          participantsArray: [currentUser.email, userB.email],
        };
        try {
          await setDoc(roomRef, roomData);
        } catch (error) {
          // console.log(error);
          BugsnagLogger.log(error, 'error from chatScreen');
        }
      }
      const emailHash = `${currentUser.email}:${userB.email}`;
      setRoomHash(emailHash);
      if (selectedImage && selectedImage.uri) {
        await sendImage(selectedImage.uri, emailHash);
      }
    })();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(roomMessagesRef, (querySnapshot) => {
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({ type }) => type === 'added')
        .map(({ doc }) => {
          const message = doc.data();
          return { ...message, createdAt: message.createdAt.toDate() };
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

      appendMessages(messagesFirestore);
    });
    return () => unsubscribe();
  }, []);

  const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [messages]
  );

  async function onSend(messages = []) {
    const writes = messages.map((m) => addDoc(roomMessagesRef, m));
    const lastMessage = messages[messages.length - 1];
    writes.push(updateDoc(roomRef, { lastMessage }));

    await Promise.all(writes);
  }

  return (
    <>
      <GiftedChat
        onSend={onSend}
        messages={messages}
        user={senderUser}
        renderAvatar={null}
        timeTextStyle={{ right: { color: colors.gray } }}
        renderSend={(props) => {
          const { text, messageIdGenerator, user, onSend } = props;
          return (
            <TouchableOpacity
              style={{
                height: 40,
                width: 40,
                borderRadius: 40,
                backgroundColor: colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 10,
                marginTop: 10,
              }}
              onPress={() => {
                if (text && onSend) {
                  onSend(
                    {
                      text: text.trim(),
                      user,
                      _id: messageIdGenerator(),
                    },
                    true
                  );
                }
              }}
            >
              <Ionicons name='send' size={20} color={colors.white} />
            </TouchableOpacity>
          );
        }}
        renderBubble={(props) => (
          <Bubble
            {...props}
            textStyle={{ right: { color: colors.grey } }}
            wrapperStyle={{
              left: {
                backgroundColor: colors.light,
              },
              right: {
                backgroundColor: colors.light,
              },
            }}
          />
        )}
      />
    </>
  );
}
