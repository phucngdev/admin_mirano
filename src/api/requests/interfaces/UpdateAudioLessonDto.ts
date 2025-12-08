export interface UpdateAudioLessonDto {
  audioUrl: string;
  question: string;
  blanks: {
    index: number;
    answer: string;
    explanation: string;
  }[];
}
