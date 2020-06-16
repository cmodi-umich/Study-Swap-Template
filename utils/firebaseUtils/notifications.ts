import firebase from "../../constants/Firebase";

import { collections } from "../../constants/FirebaseStrings";
import { notificationModel } from "../../constants/Models";

const db = firebase.firestore();

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

export { getNotifications, readNotification };
