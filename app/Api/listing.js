import firebase from './FirebaseDatabase';
import { getDocs, addDoc } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import BugsnagLogger from '../utilities/logger';
import imagesApi from './imagesApi';

const doneItemsCollectionRef = firebase.doneItemsCollectionRef;

const storage = firebase.storage;

async function getListing() {
  // console.log('getListing called 000');
  try {
    const doneItemsSnapshot = await getDocs(doneItemsCollectionRef);
    const doneItems = doneItemsSnapshot.docs.map(async (doc) => {
      // const storageRef = ref(storage, `images/${doc.data().label}.jpg`);
      // const url = await getDownloadURL(storageRef);

      return {
        ...doc.data(),
        id: doc.id,
      };
    });

    //await the whole array of promices before return
    const all = await Promise.all(doneItems);

    return all;
  } catch (error) {
    // BugsnagLogger.log(error, 'getListing error');
    console.log(error);
  }
}

const addListing = async (values, formikBag) => {
  try {
    // const listingImageURL = await imagesApi('images', values);

    addDoc(doneItemsCollectionRef, {
      label: `${values.label}`,
      price: `${values.price}`,
      description: `${values.description}`,
      // listingImageURL: listingImageURL,
      listingImageURL:
        'https://firebasestorage.googleapis.com/v0/b/qiqimarket-649b4.appspot.com/o/images%2Fnewpost3.png?alt=media&token=8a43f310-7542-424a-80df-130b32741198',
    });

    formikBag.resetForm();
  } catch (error) {
    // BugsnagLogger.log(error, 'addListing error');
    console.log(error);
  }
};

export default {
  getListing,
  addListing,
};
