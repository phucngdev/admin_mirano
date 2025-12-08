export interface CreateAudioLessonDto {
  audioUrl: string;
  lessonId: string;
  question: string;
  blanks: {
    index: number;
    answer: string;
    explanation: string;
  }[];
}
