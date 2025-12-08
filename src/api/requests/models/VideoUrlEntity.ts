/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DocumentEntityType } from './DocumentEntityType';
import type { ObjectId } from './ObjectId';

export type VideoUrlEntity = {
  id: string;
  videoUrl: string;
  lessonId: ObjectId;
  description: string;
  documents: Array<DocumentEntityType>;
  allowPreview: boolean;
  videoRewindLock: boolean;
  allowDiscussion: boolean;
};

