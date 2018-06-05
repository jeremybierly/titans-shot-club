import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBPrmzssihNDZ--cZveUH9-zNSeFKSb7Jg",
  authDomain: "titans-shot-club.firebaseapp.com",
  databaseURL: "https://titans-shot-club.firebaseio.com",
  projectId: "titans-shot-club",
  storageBucket: "titans-shot-club.appspot.com",
  messagingSenderId: "378530368690"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const database = firebase.database();

export {
  auth, database
};