import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

async function imagesApi(path, values) {
  const storage = getStorage();

  const storageRef = ref(storage, `${path}/${values.label}.jpg`);

  const img = await fetch(values.images[0]);
  const bytes = await img.blob();

  try {
    await uploadBytes(storageRef, bytes);
  } catch (error) {
    console.log(error, 'hi error');
  }
}

export default imagesApi;
