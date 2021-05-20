import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_MESSAGING_APP_ID,
});

const firestore = firebase.firestore();
const videosRef = firestore.collection('videos');
export const query = videosRef.orderBy('timestamp');

export const addVideo = async ({
  id,
  youtubeId,
  title,
  duration,
  timestamp,
}) => {
  await videosRef.doc(id).set({
    id,
    title,
    youtubeId,
    duration,
    timestamp,
  });
};

export const deleteVideo = async (id) => {
  await videosRef.doc(id).delete();
};

export const getDocument = async (id) => {
  const doc = await videosRef.doc(id).get();
  if (doc.exists) {
    return doc.data();
  }
};

export const updateDocument = async (id, prop, value) => {
  await videosRef.doc(id).update({ [prop]: value });
};
