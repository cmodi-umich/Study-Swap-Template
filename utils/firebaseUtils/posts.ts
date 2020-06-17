import firebaseApp from "firebase/app";
import firebase from "../../constants/Firebase";

import { collections } from "../../constants/FirebaseStrings";
import { postModel } from "../../constants/Models";

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
    .then(
      (snapShot: any): Array<postModel> => {
        const posts: Array<postModel> = [];
        snapShot.forEach((post: any): void => {
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
      }
    )
    .catch((err: any): void => {
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
    .then(
      (snapShot: any): Array<postModel> => {
        const posts: Array<postModel> = [];
        snapShot.forEach((post: any): void => {
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
      }
    )
    .catch((err: any): void => {
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
    .then(
      (user: any): Array<postModel[] | void> => {
        const classes: Array<string> = user.data().classes;
        let posts: Array<postModel[] | void> = [];
        classes.forEach(
          async (class_: string): Promise<void> => {
            // For each class concat all of the posts
            const postBlob = getPosts(class_);
            posts = posts.concat(await postBlob);
          }
        );
        return posts;
      }
    )
    .catch((err: any): void => {
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
    .catch((err: any): void => {
      console.error(err); // will be changed to redirect to error screen
    });
}

/*
  @type     DELETE -> Posts
  @desc     remove an old post from a class
*/
function removePost(postId: string): void {
  db.collection(collections.posts)
    .doc(postId)
    .delete()
    .catch((err: any): void => {
      console.error(err); // will be changed to redirect to error screen
    });
  db.collection(collections.comments)
    .where("postId", "==", postId)
    .get()
    .then((res: any): void => {
      let batch = db.batch();
      res.forEach((doc: any): void => {
        batch.delete(doc.ref);
      });
      batch.commit().catch((err: any): void => {
        console.error(err); // will be changed to redirect to error screen
      });
    })
    .catch((err: any): void => {
      console.error(err); // will be changed to redirect to error screen
    });
}

/*
  @type     PATCH -> Posts
  @desc     edit a post with newText
*/
function editPost(postId: string, newText: string): void {
  db.collection(collections.posts)
    .doc(postId)
    .update({ postText: newText })
    .catch((err: any): void => {
      console.error(err); // will be changed to redirect to error screen
    });
}

export { getPosts, getUserPosts, getFeed, addPost, removePost, editPost };
