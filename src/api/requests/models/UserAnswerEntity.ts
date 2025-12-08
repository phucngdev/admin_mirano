/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InBlankAnswerDto } from './InBlankAnswerDto';
import type { MatchingAnswerDto } from './MatchingAnswerDto';
import type { MultipleChoiceAnswerDto } from './MultipleChoiceAnswerDto';
import type { MultipleChoiceHorizontalDto } from './MultipleChoiceHorizontalDto';
import type { SortingAnswerDto } from './SortingAnswerDto';

export type UserAnswerEntity = {
  questionId: string;
  questionType: string;
  answer: Array<(MultipleChoiceAnswerDto | MatchingAnswerDto | SortingAnswerDto | MultipleChoiceHorizontalDto | InBlankAnswerDto)>;
};

