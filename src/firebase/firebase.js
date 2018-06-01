import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyB3DAEEKTfxKZFWrBa0EMnIIvKdxn-9378",
    authDomain: "shot-tracker-101f2.firebaseapp.com",
    databaseURL: "https://shot-tracker-101f2.firebaseio.com",
    projectId: "shot-tracker-101f2",
    storageBucket: "shot-tracker-101f2.appspot.com",
    messagingSenderId: "310907900161"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const database = firebase.database();

export {
  auth,database
};