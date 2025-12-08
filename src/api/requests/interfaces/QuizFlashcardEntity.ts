import type { QuestionQuizEntity } from './QuestionQuizEntity';

export interface QuizFlashcardEntity {
  id: string;
  lessonId: string;
  time: number;
  lockRightClickAndCopy: boolean;
  allowDiscussion: boolean;
  deadline: boolean;
  timeTest: boolean;
  questionPositionReversal: boolean;
  allowRedo: boolean;
  correctAnswerRequiredToMoveOn: boolean;
  questions: QuestionQuizEntity[];
}
