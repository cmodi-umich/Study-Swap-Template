import firebaseApp from "firebase/app";
import firebase from "../../constants/Firebase";

import { collections } from "../../constants/FirebaseStrings";
import { classModel } from "../../constants/Models";

const db = firebase.firestore();

// Function used to get the list of classes user is enrolled in
function getClassList(userId: string): Promise<string[] | void> {
  return db
    .collection(collections.users)
    .doc(userId)
    .get()
    .then(
      (user: any): Array<string> => {
        return user.data().classes;
      }
    )
    .catch((err: any): void => {
      console.error(err); // will be changed to redirect to error screen
    });
}

/*
  @type     GET -> Classes
  @desc     get all classes for a classId array
*/
async function getClasses(classes: Array<string>): Promise<any> {
  // TODO Later: Fix 'any' in return...
  return Promise.all(
    classes.map((id) => {
      db.collection(collections.classes)
        .doc(id)
        .get()
        .then(
          (class_: any): classModel => {
            const data = class_.data();
            return {
              id: class_.id,
              className: data.className,
              classDescription: data.classDescription,
            };
          }
        )
        .catch((err: any): void => {
          console.error(err); // will be changed to redirect to error screen
        });
    })
  );
}

/*
  @type     POST -> Classes
  @desc     add new classes to user
*/
function addClasses(userId: string, newClasses: Array<string>): void {
  // newClasses are not in current classes - managed with FE
  const ref = db.collection(collections.users).doc(userId);
  newClasses.forEach((class_: string): void => {
    ref
      .update({
        classes: firebaseApp.firestore.FieldValue.arrayUnion(class_),
      })
      .catch((err: any): void => {
        console.error(err); // will be changed to redirect to error screen
      });
  });
}

/*
  @type     POST -> Classes
  @desc     removes classes from user
*/
function removeClasses(userId: string, oldClasses: Array<string>): void {
  // oldClasses are in current classes manage with FE
  const ref = db.collection(collections.users).doc(userId);
  oldClasses.forEach((class_: string): void => {
    ref
      .update({
        classes: firebaseApp.firestore.FieldValue.arrayRemove(class_),
      })
      .catch((err: any): void => {
        console.error(err); // will be changed to redirect to error screen
      });
  });
}

/*
  @type     POST -> Classes
  @desc     create new class to join
  @access   Only should be accessable by admins
*/
function createClass(newClass: classModel): void {
  db.collection(collections.classes)
    .add(newClass)
    .catch((err: any): void => {
      console.error(err); // will be changed to redirect to error screen
    });
}

export { getClassList, getClasses, addClasses, removeClasses, createClass };
