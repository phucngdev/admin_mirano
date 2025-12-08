export interface UpdateQuizFlashCardDto {
  time: number;
  lockRightClickAndCopy: boolean;
  allowDiscussion: boolean;
  deadline: boolean;
  timeTest: boolean;
  questionPositionReversal: boolean;
  allowRedo: boolean;
  correctAnswerRequiredToMoveOn: boolean;
}
