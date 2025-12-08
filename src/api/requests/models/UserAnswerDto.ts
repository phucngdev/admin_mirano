/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InBlankAnswerDto } from './InBlankAnswerDto';
import type { MatchingAnswerDto } from './MatchingAnswerDto';
import type { MultipleChoiceAnswerDto } from './MultipleChoiceAnswerDto';
import type { MultipleChoiceHorizontalDto } from './MultipleChoiceHorizontalDto';
import type { SortingAnswerDto } from './SortingAnswerDto';

export type UserAnswerDto = {
  questionId: string;
  questionType: UserAnswerDto.questionType;
  answer: Array<(MultipleChoiceAnswerDto | MatchingAnswerDto | SortingAnswerDto | MultipleChoiceHorizontalDto | InBlankAnswerDto)>;
};

export namespace UserAnswerDto {

  export enum questionType {
    MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
    SORTING = 'SORTING',
    MATCHING = 'MATCHING',
    MULTIPLE_CHOICE_HORIZONTAL = 'MULTIPLE_CHOICE_HORIZONTAL',
    FILL_IN_BLANK = 'FILL_IN_BLANK',
    CHOOSE_ANSWER_IN_BLANK = 'CHOOSE_ANSWER_IN_BLANK',
    ESSAY = 'ESSAY',
  }


}

