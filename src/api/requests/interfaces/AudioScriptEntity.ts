export interface AudioScriptEntity {
  id: string;
  audioUrl: string;
  lessonId: string;
  question: string;
  blanks: {
    index: number;
    answer: string;
    explanation: string;
  }[];
}
