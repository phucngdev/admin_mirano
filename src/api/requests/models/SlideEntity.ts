/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DocumentEntityType } from './DocumentEntityType';

export type SlideEntity = {
  id: string;
  slideUrl: string;
  lessonId: string;
  description: string;
  documents: Array<DocumentEntityType>;
  lockRightClickAndCopy: boolean;
  allowContentDownloads: boolean;
  allowDiscussion: boolean;
};

