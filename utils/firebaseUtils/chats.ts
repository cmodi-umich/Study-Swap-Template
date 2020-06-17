import firebaseApp from "firebase/app";
import firebase from "../../constants/Firebase";

import { collections } from "../../constants/FirebaseStrings";
import { chatsModel, messageModel } from "../../constants/Models";

const db = firebase.firestore();

/*
  @type     GET -> Messages
  @desc     watch all messages that belong to a chat -> return on change
*/
function watchMessages(chatId: string, setMessages: Function): any {
  //TODO Fix any return....
  return db
    .collection(collections.messages)
    .where("chatId", "==", chatId)
    .orderBy("timestamp", "desc")
    .onSnapshot((querySnapshot: any): void => {
      const messages: Array<messageModel> = [];
      querySnapshot.forEach((message: any): void => {
        const data = message.data();
        messages.push({
          id: message.id,
          chatId: data.chatId,
          messageText: data.messageText,
          senderId: data.senderId,
          senderName: data.senderName,
          timestamp: data.timestamp,
        });
      });
      setMessages(messages);
    });
}

/*
  @type     POST -> Messages
  @desc     add new message
*/
function addMessages(message: messageModel): void {
  db.collection(collections.messages).add({
    timestamp: firebaseApp.firestore.FieldValue.serverTimestamp(),
    ...message,
  });
}

/*
  @type     GET -> Chats
  @desc     get user chats
*/
function getChats(userId: string): Promise<chatsModel[] | void> {
  return db
    .collection(collections.chats)
    .where("members", "array-contains", userId)
    .get()
    .then(
      (snapshot): Array<chatsModel> => {
        const chats: Array<chatsModel> = [];
        snapshot.forEach((chat): void => {
          const data = chat.data();
          chats.push({
            id: chat.id,
            members: data.members,
            messages: data.messages,
          });
        });
        return chats;
      }
    )
    .catch((err) => {
      console.log(err);
    });
}

/*
  @type     POST -> Chats
  @desc     add new chat
*/
function addChats(userId: string, recepientId: string): any {
  //TODO Fix any return....
  // Make new chat
  db.collection(collections.chats)
    .add({
      members: [userId, recepientId],
      messages: [],
    })
    .then((chat: any): void => {
      // Then add chat to users chat list
      db.collection(collections.users)
        .doc(userId)
        .update({
          chats: firebaseApp.firestore.FieldValue.arrayUnion(chat.id),
        })
        .catch((err: any): void => {
          console.error(err); // will be changed to redirect to error screen
        });
      db.collection(collections.users)
        .doc(recepientId)
        .update({
          chats: firebaseApp.firestore.FieldValue.arrayUnion(chat.id),
        })
        .catch((err: any): void => {
          console.error(err); // will be changed to redirect to error screen
        });
    })
    .catch((err: any): void => {
      console.error(err); // will be changed to redirect to error screen
    });
}

/*
  @type     POST -> Chats
  @desc     add new member to chat
*/
function addMember(memberId: string, chatId: string): any {
  //TODO Fix any return....
  const ref = db.collection(collections.chats).doc(chatId);
  // Add memberId to member array
  ref
    .update({
      members: firebaseApp.firestore.FieldValue.arrayUnion(memberId),
    })
    .catch((err: any): void => {
      console.error(err); // will be changed to redirect to error screen
    });
  // Add chatId to new members chats array
  ref
    .get()
    .then((chat: any): void => {
      db.collection(collections.users)
        .doc(memberId)
        .update({ chats: firebaseApp.firestore.FieldValue.arrayUnion(chat.id) })
        .catch((err: any): void => {
          console.error(err); // will be changed to redirect to error screen
        });
    })
    .catch((err: any): void => {
      console.error(err); // will be changed to redirect to error screen
    });
}

/*
  @type     PATCH -> Chats
  @desc     remove member from chat
*/
function leaveChat(memberId: string, chatId: string): any {
  //TODO Fix any return....
  const ref = db.collection(collections.chats).doc(chatId);
  // Delete memberId from member array
  ref
    .update({
      members: firebaseApp.firestore.FieldValue.arrayRemove(memberId),
    })
    .catch((err: any): void => {
      console.error(err); // will be changed to redirect to error screen
    });
  // Remove chatId from old members chats array
  ref
    .get()
    .then((chat: any): void => {
      db.collection(collections.users)
        .doc(memberId)
        .update({
          chats: firebaseApp.firestore.FieldValue.arrayRemove(chat.id),
        })
        .catch((err: any): void => {
          console.error(err); // will be changed to redirect to error screen
        });
    })
    .catch((err: any): void => {
      console.error(err); // will be changed to redirect to error screen
    });
}

export { watchMessages, addMessages, getChats, addChats, addMember, leaveChat };
