import { stringify } from '@firebase/util';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';
import { Alert } from 'react-native';
import BugsnagLogger from '../utilities/logger';

async function imagesApi(path, values) {
  console.log(values.images[0], 'png or jpg??');
  return fetch(values.images[0])
    .then((img) => img.blob())
    .then(
      (bytes) =>
        new Promise(function (resolve, reject) {
          const storage = getStorage();
          const storageRef = ref(
            storage,
            `${path}/${values.label}.${values.images[0].slice(-3)}`
          );

          // const img = await fetch(values.images[0]);
          // const bytes = await img.blob();

          const uploadTask = uploadBytesResumable(storageRef, bytes);

          // Register three observers:
          // 1. 'state_changed' observer, called any time the state changes
          // 2. Error observer, called on failure
          // 3. Completion observer, called on successful completion
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused');
                  break;
                case 'running':
                  console.log('Upload is running');
                  break;
              }
            },
            (error) => {
              console.log(error, 'upload img error');
            },
            () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log(downloadURL, 'listing iamge return url 111');
                resolve(downloadURL);
              });
            }
          );
        })
    )
    .catch((err) => {
      console.log(err);
    });
}

// try {
//   await uploadBytes(storageRef, bytes);
// } catch (error) {
//   console.log(error, 'hi error');
//   BugsnagLogger.log(error, 'error from upload listing image');
// }

export default imagesApi;
