/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InBlankAnswerDto } from './InBlankAnswerDto';
import type { MatchingAnswerDto } from './MatchingAnswerDto';
import type { MultipleChoiceAnswerDto } from './MultipleChoiceAnswerDto';
import type { MultipleChoiceHorizontalDto } from './MultipleChoiceHorizontalDto';
import type { SortingAnswerDto } from './SortingAnswerDto';

export type QuestionUserAnswerEntity = {
  id: string;
  content: string;
  explain: string;
  correctAnswers: Array<(MultipleChoiceAnswerDto | MatchingAnswerDto | SortingAnswerDto | MultipleChoiceHorizontalDto | InBlankAnswerDto)>;
  userAnswers: Array<(MultipleChoiceAnswerDto | MatchingAnswerDto | SortingAnswerDto | MultipleChoiceHorizontalDto | InBlankAnswerDto)>;
};

