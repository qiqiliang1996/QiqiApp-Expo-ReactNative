import firebase from './FirebaseDatabase';
import { getDocs, addDoc } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';

const doneItemsCollectionRef = firebase.doneItemsCollectionRef;

const storage = firebase.storage;

async function getListing() {
  // console.log('getListing called 000');
  try {
    const doneItemsSnapshot = await getDocs(doneItemsCollectionRef);
    const doneItems = doneItemsSnapshot.docs.map(async (doc) => {
      const storageRef = ref(storage, `images/${doc.data().label}.jpg`);
      const url = await getDownloadURL(storageRef);

      return {
        ...doc.data(),
        id: doc.id,
        image: url,
      };
    });

    //await the whole array of promices before return
    const all = await Promise.all(doneItems);

    return all;
  } catch (error) {
    console.log(error);
  }
}

const addListing = async (values, formikBag) => {
  try {
    const upload = await addDoc(doneItemsCollectionRef, {
      label: `${values.label}`,
      price: `${values.price}`,
      description: `${values.description}`,
    });

    formikBag.resetForm();
  } catch (error) {
    console.log(error, 'sorry!');
  }
};

export default {
  getListing,
  addListing,
};
