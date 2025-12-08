export interface UpdateVideoLessonDto {
  videoUrl: string;
  description: string;
  allowPreview: boolean;
  videoRewindLock: boolean;
  allowDiscussion: boolean;
}
