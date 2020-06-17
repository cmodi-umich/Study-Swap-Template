interface userModel {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  grade: string;
  bio: string;
  classes: Array<string>;
  chats: Array<string>;
}

interface classModel {
  id?: string;
  className: string;
  classDescription: string;
}

interface postModel {
  id?: string;

  // foreign key relations
  userId: string; // points to post-er
  classId: string; // points to class post belongs to

  // post specific
  postText: string;
  postUserName: string;
  postClassName: string;
  timestamp?: any;
  edited: boolean;
}

interface commentModel {
  id?: string;

  // foreign key relations
  userId: string;
  postId: string;

  // comment specific
  commenterName: string;
  timestamp?: any;
  commentText: string;
}

interface notificationModel {
  id?: string;

  // foreign key relations
  userId: string; // points to user
  senderId: string; // points to sender of notification

  // notification specific
  senderName: string;
  notificationText: string;
  timestamp?: any;
  read: boolean;
}

interface chatsModel {
  id?: string;

  //foreign key relations
  members: Array<string>; // array of userIds of members

  // chats specific
  messages: Array<string>; // array of messageIds
}

interface messageModel {
  id?: string;

  //foreign key relations
  chatId: string; // points to the chat containing the message

  // message specific
  messageText: string;
  senderId: string;
  senderName: string;
  timestamp?: string;
}

export {
  userModel,
  classModel,
  postModel,
  commentModel,
  notificationModel,
  chatsModel,
  messageModel,
};
