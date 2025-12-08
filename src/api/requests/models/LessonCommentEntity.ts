/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type LessonCommentEntity = {
  id: string;
  lessonId: string;
  userId: string;
  avatarUrl: string;
  fullName: string;
  content: string;
  parentCommentId: string;
  children: Array<LessonCommentEntity>;
  createdAt: string;
  updatedAt: string;
};

