import firebaseApp from "firebase/app";
import firebase from "../../constants/Firebase";

import { collections } from "../../constants/FirebaseStrings";
import { userModel } from "../../constants/Models";

const db = firebase.firestore();

async function addUser(
  email: string,
  password: string,
  userInfo: userModel
): Promise<void> {
  const { firstName, lastName, grade, bio, classes, chats } = userInfo;
  await firebaseApp.auth().createUserWithEmailAndPassword(email, password);
  const user = firebaseApp.auth().currentUser;
  db.collection(collections.users).doc(user.uid).set({
    firstName,
    lastName,
    grade,
    email,
    bio,
    classes,
    chats,
  });
}

export { addUser };
