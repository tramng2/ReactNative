import * as firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCFsamOl2VE6y30r9a9NBPSPF8TDIu5Huo",
  authDomain: "reactnativ-dc960.firebaseapp.com",
  databaseURL: "https://reactnativ-dc960-default-rtdb.firebaseio.com",
  projectId: "reactnativ-dc960",
  storageBucket: "reactnativ-dc960.appspot.com",
  messagingSenderId: "404394329526",
  appId: "1:404394329526:web:92f5756c8ed2e59896ed17",
  measurementId: "G-TKYHJR3BKZ",
};

export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
