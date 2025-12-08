export interface UpdateQuestionQuizDto {
  question: string;
  explanation: string;
  position: number;
  answers: {
    title: string;
    isCorrect: true;
  }[];
}
