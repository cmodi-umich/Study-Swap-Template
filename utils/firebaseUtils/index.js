import firebaseApp from "firebase/app";
import firebase from "../constants/Firebase";

import { collections } from "../../constants/FirebaseStrings";
import {
  userDbModel,
  classDbModel,
  postDbModel,
  notificationDbModel,
} from "../../constants/Models";

const db = firebase.firestore();
