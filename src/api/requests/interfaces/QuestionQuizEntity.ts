export interface QuestionQuizEntity {
  id: string;
  question: string;
  position: number;
  explanation: string;
  answers: {
    title: string;
    isCorrect: true;
  }[];
}
