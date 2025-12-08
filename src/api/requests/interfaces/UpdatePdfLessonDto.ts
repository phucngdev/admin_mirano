export interface UpdatePdfLessonDto {
  slideUrl: string;
  description: string;
  lockRightClickAndCopy: boolean;
  allowContentDownloads: boolean;
  allowDiscussion: boolean;
}
