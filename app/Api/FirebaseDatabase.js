import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
// import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAqKT2p32TZ1pi7BXMNvZxYSOPXwFGIU3U',
  authDomain: 'qiqimarket-649b4.firebaseapp.com',
  projectId: 'qiqimarket-649b4',
  storageBucket: 'qiqimarket-649b4.appspot.com',
  messagingSenderId: '104537799428',
  appId: '1:104537799428:web:9cdd96a349e24bcc692e51',
};

//init firebase app
const app = initializeApp(firebaseConfig);

//init services
const db = getFirestore();

//doneItems collection Ref
const doneItemsCollectionRef = collection(db, 'doneItems');

//users collection Ref
const usersCollectionRef = collection(db, 'users');

//getStorage
const storage = getStorage();

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth();

//get all docs from a collection
const docs = getDocs(doneItemsCollectionRef)
  .then((snapshot) => {
    let doneItems = [];
    snapshot.docs.forEach((doc) => {
      doneItems.push({ ...doc.data(), id: doc.id });
    });
    // console.log(doneItems, '000?');
    return doneItems;
  })
  .catch((error) => {
    console.log(error);
  });

// get AssetImage//
const getAssetImage = async (name) => {
  const storageRef = ref(storage, `images/asset/${name}`);
  const url = await getDownloadURL(storageRef);
  return url;
};

const getAvatarImage = async (email) => {
  const storageRef = ref(
    storage,
    `images/userProfileImages/${email}/profilePicture.jpeg`
  );

  try {
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    // console.log(error.message, '00 firebase.getAvatarImage');
    const subURL = await getDownloadURL(
      ref(storage, `images/asset/avatar.png`)
    );
    return subURL;
  }
};

export default {
  db,
  storage,
  auth,
  doneItemsCollectionRef,
  getDocs,
  docs,
  getAssetImage,
  usersCollectionRef,
  getAvatarImage,
};
