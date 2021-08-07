import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBArNMI30XRh4XNclH3V8W1IodqDBZXxlY",
    authDomain: "fe-devtest.firebaseapp.com",
    projectId: "fe-devtest",
    storageBucket: "fe-devtest.appspot.com",
    messagingSenderId: "494961672164",
    appId: "1:494961672164:web:ac59a745b2f87abe2651f1"
  };

 const firebaseApp = firebase.initializeApp(firebaseConfig);
 const db = firebaseApp.firestore();
 const auth = firebase.auth();
 const provider = new firebase.auth.GoogleAuthProvider()

 export { db, auth , provider };