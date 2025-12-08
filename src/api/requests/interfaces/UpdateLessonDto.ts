export interface UpdateLessonDto {
  title: string;
  videoUrl?: string | null;
  isRequired: boolean;
  pos: number;
}
