import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import Screen from '../components/Screen';
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from '../components/lists';

const initialMessages = [
  {
    id: 1,
    title: 'Mosh Hamedani',
    description: 'Hey! Is this item still available?',
    image: require('../assets/mosh.jpg'),
  },
  {
    id: 2,
    title: 'Angel Geogia',
    description: "I'm interested in this camer. ",
    image: require('../assets/angel.jpg'),
  },
  {
    id: 3,
    title: 'Anna hundger',
    description: 'Do you accept lower price?',
    image: require('../assets/anna.jpg'),
  },
  {
    id: 4,
    title: 'Fion Feng',
    description: 'Where you located?',
    image: require('../assets/fiona.jpg'),
  },
];

function MessagesScreen(props) {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (message) => {
    // Delete the message from messages
    setMessages(messages.filter((m) => m.id !== message.id));
  };

  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            left
            title={item.title}
            subTitle={item.description}
            image={item.image}
            // onPress={() => console.log('Message selected', item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          console.log('refresh');
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default MessagesScreen;
