// import { QuestionEntity } from './QuestionEntity';

import { QuestionEntity } from '../models/QuestionEntity';

export const practiceTypeLabelMap: Record<QuestionEntity.type, string> = {
  [QuestionEntity.type.MULTIPLE_CHOICE]: 'Trắc nghiệm',
  // [QuestionEntity.type.TrueFalse]: 'Đúng/Sai',
  [QuestionEntity.type.FILL_IN_BLANK]: 'Điền từ',
  // [QuestionEntity.type.DragAndDrop]: 'Kéo và thả',
  [QuestionEntity.type.SORTING]: 'Sắp xếp câu',
  [QuestionEntity.type.CHOOSE_ANSWER_IN_BLANK]: 'Chọn đáp án vào chỗ trống',
  [QuestionEntity.type.MATCHING]: 'Ghép đôi',
  [QuestionEntity.type.MULTIPLE_CHOICE_HORIZONTAL]: 'Trắc nghiệm đơn',
  [QuestionEntity.type.ESSAY]: 'Bài nộp file',
};

export const practiceTypeColorMap: Record<QuestionEntity.type, string> = {
  [QuestionEntity.type.MULTIPLE_CHOICE]: '#a65a53',
  // [QuestionEntity.type.TrueFalse]: '#f2a2b1',
  [QuestionEntity.type.FILL_IN_BLANK]: '#bfa4bf',
  [QuestionEntity.type.CHOOSE_ANSWER_IN_BLANK]: '#a65170',
  [QuestionEntity.type.SORTING]: '#91d9bf',
  [QuestionEntity.type.MATCHING]: '#80bdf2',
  [QuestionEntity.type.MULTIPLE_CHOICE_HORIZONTAL]: '#80bdf2',
  [QuestionEntity.type.ESSAY]: '#a65170',
};
