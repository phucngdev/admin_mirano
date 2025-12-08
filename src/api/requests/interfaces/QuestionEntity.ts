export type FlexibleAnswer =
  | { title: string; iscorrect: boolean }[]
  | string[]
  | string[][]
  | boolean;

export interface QuestionEntity {
  id: string;
  content: string;
  explain?: string;
  imageUrl?: string;
  audioUrl?: string;
  type?: QuestionEntity.QuestionType;
  multipleChoiceAnswers?: { title: string; iscorrect: boolean }[];
  matchingAnswers?: { left: string; right: string }[];
  sortingAnswers?: { content: string; index: number }[];
  multipleChoiceHorizontal?: { isCorrect: true; content: string }[];
  options?: string[];
  fillInBlank?: {
    index: number;
    correctAnswer: string;
    explanation: string;
  }[];
  essayAnswers?: { examUrl: string; description: string }[];
}

export namespace QuestionEntity {
  export enum QuestionType {
    MultipleChoice = 'MULTIPLE_CHOICE',
    // TrueFalse = 'TrueFalse',
    // DragAndDrop = 'DragAndDrop',
    ShortAnswer = 'SORTING',
    Matching = 'MATCHING', // ghép đôi
    MULTIPLE_CHOICE_HORIZONTAL = 'MULTIPLE_CHOICE_HORIZONTAL',
    FillInBlank = 'FILL_IN_BLANK',
    ESSAY_TEST = 'ESSAY',
    CHOOSE_ANSWER_IN_BLANK = 'CHOOSE_ANSWER_IN_BLANK',
  }
}
