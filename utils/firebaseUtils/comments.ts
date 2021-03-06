import firebaseApp from "firebase/app";
import firebase from "../../constants/Firebase";

import { collections } from "../../constants/FirebaseStrings";
import { commentModel } from "../../constants/Models";

const db = firebase.firestore();

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
    .then(
      (snapshot: any): Array<commentModel> => {
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
      }
    )
    .catch((err: any): void => {
      console.error(err); // will be changed to redirect to error screen
    });
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
    .catch((err: any): void => {
      console.error(err); // will be changed to redirect to error screen
    });
}

/*
  @type     DELETE -> Comments
  @desc     delete old comment
  */
function deleteComment(commentId: string): void {
  db.collection(collections.comments)
    .doc(commentId)
    .delete()
    .catch((err: any): void => {
      console.error(err); // will be changed to redirect to error screen
    });
}

/*
  @type     PATCH -> Comments
  @desc     edit old comment
  */
function editComment(commentId: string, newText: string): void {
  db.collection(collections.comments)
    .doc(commentId)
    .update({ commentText: newText })
    .catch((err: any): void => {
      console.error(err); // will be changed to redirect to error screen
    });
}

export { getComments, addComment, deleteComment, editComment };
