import type { DocumentEntity } from './DocumentEntity';

export interface LessonVideoEntity {
  id: string;
  itemName: string;
  videoUrl: string;
  lessonId: string;
  description: string;
  documents: DocumentEntity[]; // sửa sau
  discuss: any[]; // sửa sau
  allowPreview: boolean;
  videoRewindLock: boolean;
  allowDiscussion: boolean;
}
