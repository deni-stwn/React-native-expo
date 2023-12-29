import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDKqKSR2QSXBDf9ih3wNw2EUqvAbGcJ91g",
  authDomain: "tasktracker-746f2.firebaseapp.com",
  projectId: "tasktracker-746f2",
  storageBucket: "tasktracker-746f2.appspot.com",
  messagingSenderId: "915929437505",
  appId: "1:915929437505:web:8f2494ffdc4940d8e0fdc0",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
export const auth = firebase.auth();
export const db = firebase.firestore();
