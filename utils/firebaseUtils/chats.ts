import firebaseApp from "firebase/app";
import firebase from "../../constants/Firebase";

import { collections } from "../../constants/FirebaseStrings";
import { chatsModel, messageModel } from "../../constants/Models";

const db = firebase.firestore();

/*
  @type     GET -> Messages
  @desc     get all messages that belong to a chat
*/
function getMessages(chatId: string, setMessages: Function): any {
  //TODO Fix any return....
  return db
    .collection(collections.messages)
    .where("chatId", "==", chatId)
    .orderBy("timestamp", "asc")
    .onSnapshot((querySnapshot) => {
      const messages: Array<messageModel> = [];
      querySnapshot.forEach((message) => {
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
function addMessages(message: messageModel): any {
  //TODO Fix any return....
  return db.collection(collections.messages).add({
    timestamp: firebaseApp.firestore.FieldValue.serverTimestamp(),
    ...message,
  });
}

/*
  @type     GET -> Chats
  @desc     get user chats
*/
function getChats(userId: string): Promise<chatsModel[] | void> {
  //TODO Fix any return....
  return db
    .collection(collections.chats)
    .where("members", "array-contains", userId)
    .get()
    .then((snapshot) => {
      const chats: Array<chatsModel> = [];
      snapshot.forEach((chat) => {
        const data = chat.data();
        chats.push({
          id: chat.id,
          members: data.members,
          messages: data.messages,
        });
      });
      return chats;
    })
    .catch((err) => {
      console.log(err);
    });
}

/*
  @type     POST -> Chats
  @desc     add new chat
*/
function addChats(userId: string, recepientId: string): any {
  db.collection(collections.chats)
    .add({
      members: [userId, recepientId],
      messages: [],
    })
    .then((chat) => {
      db.collection(collections.users)
        .doc(userId)
        .update({
          chats: firebaseApp.firestore.FieldValue.arrayUnion(chat.id),
        });
    });
}

/*
  @type     POST -> Chats
  @desc     add new member to chat
*/
function addMember(memberId: string, chatId: string): any {
  const ref = db.collection(collections.chats).doc(chatId);
  ref.update({
    members: firebaseApp.firestore.FieldValue.arrayUnion(memberId),
  });
  ref.get().then((chat) => {
    db.collection(collections.users)
      .doc(memberId)
      .update({ chats: firebaseApp.firestore.FieldValue.arrayUnion(chat.id) });
  });
}

// TODO delete chat, leave chat

export { getMessages, addMessages, getChats, addChats, addMember };
