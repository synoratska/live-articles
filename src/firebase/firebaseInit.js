import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyA2aNRcyf6IGPDYZkckwdkQjGc3FD7ZrWc',
  authDomain: 'vuelivearticle.firebaseapp.com',
  projectId: 'vuelivearticle',
  storageBucket: 'vuelivearticle.appspot.com',
  messagingSenderId: '792275492946',
  appId: '1:792275492946:web:8495ecddeeb25544c5bf8b',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export {timestamp}
export default firebaseApp.firestore()
