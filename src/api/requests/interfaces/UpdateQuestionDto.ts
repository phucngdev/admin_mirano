import type { QuestionEntity } from './QuestionEntity';

export interface UpdateQuestionDto {
  content: string;
  explain?: string;
  type: QuestionEntity.QuestionType;
  audioUrl?: string;
  imageUrl?: string;
  sortingAnswers?: { index: number; content: string }[];
  multipleChoiceAnswers?: { isCorrect: true; content: string }[];
  matchingAnswers?: {
    left: string;
    right: string;
  }[];
  multipleChoiceHorizontal?: { isCorrect: true; content: string }[];
  options?: string[];
  fillInBlank?: {
    index: number;
    correctAnswer: string;
    explanation: string;
  }[];
  essayTest?: { url: string }[];
}
