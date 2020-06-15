interface userDbModel {
  firstName: string;
  lastName: string;
  email: string;
  grade: number | string;
  bio: string;
}

interface classDbModel {
  className: string;
  classDescription: string;
}

interface postDbModel {
  // foreign relations
  userId: string;
  groupId: string;
  // post specific
  postText: string;
  postUserName: string;
  postClassName: string;
}

interface notificationDbModel {
  // foreign relations
  userId: string; // points to user
  senderId: string; // points to sender of notification
  // notification specific
  senderName: string;
  notificationText: string;
}

export { userDbModel, classDbModel, postDbModel, notificationDbModel };
