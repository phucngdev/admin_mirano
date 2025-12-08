/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DocumentEntityType } from './DocumentEntityType';
import type { ObjectId } from './ObjectId';

export type TextEntity = {
  id: string;
  content: string;
  lessonId: ObjectId;
  description: string;
  documents: Array<DocumentEntityType>;
  allowPreview: boolean;
  lockRightClickAndCopy: boolean;
  allowDiscussion: boolean;
};

