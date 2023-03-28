import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBfLdTfTXeLDZ8_w6aIJkx9q_a_iifR3qk",
  authDomain: "ukrainian-portal.firebaseapp.com",
  projectId: "ukrainian-portal",
  storageBucket: "ukrainian-portal.appspot.com",
  messagingSenderId: "190640678200",
  appId: "1:190640678200:web:f8027eb11fe3075e2e0dcd"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export {timestamp}
export default firebaseApp.firestore()
