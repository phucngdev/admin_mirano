export interface CreateQuestionQuizDto {
  question: string;
  explanation: string;
  answers: {
    title: string;
    isCorrect: true;
  }[];
}
