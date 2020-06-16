interface userModel {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  grade: number | string;
  bio: string;
  classes: Array<string>;
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

export { userModel, classModel, postModel, commentModel, notificationModel };
