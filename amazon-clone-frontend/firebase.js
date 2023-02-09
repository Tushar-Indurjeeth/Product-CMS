import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC5uKNO9PUtTYkgAv4dnSipcVSXfJ9CxDc",
  authDomain: "amzn-2.firebaseapp.com",
  projectId: "amzn-2",
  storageBucket: "amzn-2.appspot.com",
  messagingSenderId: "110974081826",
  appId: "1:110974081826:web:a8ced9ca8f01ac7d77637b",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;
