import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyChgop5L3KSBUXBiOKy4GnkgVDBt1rKwmg",
  authDomain: "study-swap.firebaseapp.com",
  databaseURL: "https://study-swap.firebaseio.com",
  projectId: "study-swap",
  storageBucket: "study-swap.appspot.com",
  messagingSenderId: "147904517486",
  appId: "1:147904517486:web:31c8c303ac726008659d7f",
  measurementId: "G-LDE04X8YG3",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

export default firebase.app();
