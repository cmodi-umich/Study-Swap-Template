import firebaseApp from "firebase/app";
import firebase from "../../constants/Firebase";

import { collections } from "../../constants/FirebaseStrings";
import {
  userModel,
  classModel,
  postModel,
  commentModel,
  notificationModel,
} from "../../constants/Models";

const db = firebase.firestore();

/*
@type     GET -> Posts
@desc     get all posts in a certain class
*/
function getPosts(classId: string): Promise<postModel[] | void> {
  return db
    .collection(collections.posts)
    .where("classId", "==", classId)
    .orderBy("timestamp", "asc")
    .get()
    .then((snapShot) => {
      const posts: Array<postModel> = [];
      snapShot.forEach((post) => {
        const data = post.data();
        posts.push({
          userId: data.userId,
          classId: data.classId,
          postText: data.postText,
          postUserName: data.postUserName,
          postClassName: data.postClassName,
          id: post.id,
          edited: false,
        });
      });
      return posts;
    })
    .catch((err) => {
      console.error(err); // will be changed to redirect to error screen
    });
}

/*
@type     GET -> Posts
@desc     get all posts made by a certain user
*/
function getUserPosts(userId: string): Promise<postModel[] | void> {
  return db
    .collection(collections.posts)
    .where("userId", "==", userId)
    .orderBy("timestamp", "asc")
    .get()
    .then((snapShot) => {
      const posts: Array<postModel> = [];
      snapShot.forEach((post) => {
        const data = post.data();
        posts.push({
          userId: data.userId,
          classId: data.classId,
          postText: data.postText,
          postUserName: data.postUserName,
          postClassName: data.postClassName,
          id: post.id,
          edited: false,
        });
      });
      return posts;
    })
    .catch((err) => {
      console.error(err); // will be changed to redirect to error screen
    });
}

/*
@type     GET -> Posts
@desc     get all posts for a certain userId
*/
function getFeed(userId: string): Promise<any> {
  // TODO Later: Fix 'any' in return...
  return db
    .collection(collections.users)
    .doc(userId)
    .get()
    .then((user) => {
      const classes: Array<string> = user.data().classes;
      let posts: Array<postModel[] | void> = [];
      classes.forEach(async (class_: string) => {
        // For each class concat all of the posts
        const postBlob = getPosts(class_);
        posts = posts.concat(await postBlob);
      });
      return posts;
    })
    .catch((err) => {
      console.error(err); // will be changed to redirect to error screen
    });
}

/*
@type     POST -> Posts
@desc     add a new post into a class
*/
function addPost(userId: string, classId: string, post: postModel): void {
  db.collection(collections.posts)
    .add({
      timestamp: firebaseApp.firestore.FieldValue.serverTimestamp(),
      ...post,
    })
    .catch((err) => console.log(err));
}

/*
@type     DELETE -> Posts
@desc     remove an old post from a class
*/
function removePost(postId: string): void {
  db.collection(collections.posts)
    .doc(postId)
    .delete()
    .catch((err) => console.log(err));
  // TODO: add deletion to all comment subcollections/comments in collection
}

/*
@type     PATCH -> Posts
@desc     edit a post with newText
*/
function editPost(postId: string, newText: string): void {
  db.collection(collections.posts)
    .doc(postId)
    .update({ postText: newText })
    .catch((err) => console.log(err));
}

// Function used to get the list of classes user is enrolled in
function getClassList(userId: string): Promise<string[] | void> {
  return db
    .collection(collections.users)
    .doc(userId)
    .get()
    .then((user) => {
      return user.data().classes;
    })
    .catch((err) => console.log(err));
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
          (class_): classModel => {
            const data = class_.data();
            return {
              id: class_.id,
              className: data.className,
              classDescription: data.classDescription,
            };
          }
        )
        .catch((err) => console.log(err));
    })
  );
}

/*
@type     POST -> Classes
@desc     add new classes to user
*/
function addClasses(userId: string, newClasses: Array<string>): void {
  // newClasses are not in current classes manage with FE
  const ref = db.collection(collections.users).doc(userId);
  newClasses.forEach((class_) => {
    ref
      .update({
        classes: firebaseApp.firestore.FieldValue.arrayUnion(class_),
      })
      .catch((err) => console.log(err));
  });
}

/*
@type     POST -> Classes
@desc     removes classes from user
*/
function removeClasses(userId: string, oldClasses: Array<string>): void {
  // oldClasses are in current classes manage with FE
  const ref = db.collection(collections.users).doc(userId);
  oldClasses.forEach((class_) => {
    ref
      .update({
        classes: firebaseApp.firestore.FieldValue.arrayRemove(class_),
      })
      .catch((err) => console.log(err));
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
    .catch((err) => console.log(err));
}

/*
@type     GET -> Comments
@desc     get all comments for a certain post
*/
function getComments(postId: string): Promise<commentModel[] | void> {
  return db
    .collection(collections.comments)
    .where("postId", "==", postId)
    .orderBy("timestamp", "desc")
    .get()
    .then((snapshot) => {
      const comments: Array<commentModel> = [];
      snapshot.forEach((comment) => {
        const data = comment.data();
        comments.push({
          id: comment.id,
          userId: data.userId,
          postId: data.postId,
          commenterName: data.commenterName,
          commentText: data.commentText,
        });
      });
      return comments;
    })
    .catch((err) => console.log(err));
}

/*
@type     POST -> Comments
@desc     add new comment
*/
function addComment(comment: commentModel): void {
  db.collection(collections.comments)
    .add({
      timestamp: firebaseApp.firestore.FieldValue.serverTimestamp(),
      ...comment,
    })
    .catch((err) => console.log(err));
}

/*
@type     DELETE -> Comments
@desc     delete old comment
*/
function deleteComment(commentId: string): void {
  db.collection(collections.comments)
    .doc(commentId)
    .delete()
    .catch((err) => console.log(err));
}

/*
@type     PATCH -> Comments
@desc     edit old comment
*/
function editComment(commentId: string, newText: string): void {
  db.collection(collections.comments)
    .doc(commentId)
    .update({ commentText: newText })
    .catch((err) => console.log(err));
}

/*
@type     GET -> Notifications
@desc     get all notifications for a certain userId
*/
function getNotifications(userId: string): Promise<notificationModel[] | void> {
  return db
    .collection(collections.notifications)
    .where("userId", "==", userId)
    .orderBy("timestamp", "asc")
    .get()
    .then((snapShot) => {
      const notifications: Array<notificationModel> = [];
      snapShot.forEach((notification) => {
        const data = notification.data();
        notifications.push({
          userId: data.userId,
          senderId: data.senderId,
          senderName: data.senderName,
          notificationText: data.notificationText,
          id: notification.id,
          read: data.read,
        });
      });
      return notifications;
    })
    .catch((err) => {
      console.error(err); // will be changed to redirect to error screen
    });
}

/*
@type     PATCH -> Notifications
@desc     read notification
*/
function readNotification(notificationId: string): void {
  db.collection(collections.notifications)
    .doc(notificationId)
    .update({ read: true })
    .catch((err) => console.log(err));
}
