import firebase from './FirebaseDatabase';
import { getDocs, addDoc } from 'firebase/firestore';

const contactsCollectionRef = firebase.contactsCollectionRef;

async function getContacts() {
  // console.log('getListing called 000');
  try {
    const contactsSnapshot = await getDocs(contactsCollectionRef);
    const contacts = contactsSnapshot.docs.map(async (doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });

    //await the whole array of promices before return
    const all = await Promise.all(contacts);
    // console.log(all, 'all contacts from contacts.js API');
    return all;
  } catch (error) {
    // BugsnagLogger.log(error, 'getListing error');
    console.log(error);
  }
}

export default {
  getContacts,
};
