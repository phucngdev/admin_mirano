import type { DocumentEntity } from './DocumentEntity';

export interface LessonTextEntity {
  id: string;
  content: string;
  description: string;
  documents: DocumentEntity[];
  discuss?: string[];
  allowPreview: boolean;
  lockRightClickAndCopy: boolean;
  allowDiscussion: boolean;
}
