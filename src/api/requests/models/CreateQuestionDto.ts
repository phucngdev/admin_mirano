/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EssayAnswerDto } from './EssayAnswerDto';
import type { InBlankAnswerDto } from './InBlankAnswerDto';
import type { MatchingAnswerDto } from './MatchingAnswerDto';
import type { MultipleChoiceAnswerDto } from './MultipleChoiceAnswerDto';
import type { MultipleChoiceHorizontalDto } from './MultipleChoiceHorizontalDto';
import type { SortingAnswerDto } from './SortingAnswerDto';

export type CreateQuestionDto = {
  content: string;
  audioUrl?: string | null;
  imageUrl?: string | null;
  type: CreateQuestionDto.type;
  tag?: string | null;
  explain?: string | null;
  options?: Array<string> | null;
  sortingAnswers?: Array<SortingAnswerDto>;
  multipleChoiceAnswers?: Array<MultipleChoiceAnswerDto>;
  matchingAnswers?: Array<MatchingAnswerDto>;
  multipleChoiceHorizontal?: Array<MultipleChoiceHorizontalDto>;
  fillInBlank?: Array<InBlankAnswerDto>;
  chooseAnswerInBlank?: Array<InBlankAnswerDto>;
  essayAnswers?: Array<EssayAnswerDto>;
};

export namespace CreateQuestionDto {

  export enum type {
    MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
    SORTING = 'SORTING',
    MATCHING = 'MATCHING',
    MULTIPLE_CHOICE_HORIZONTAL = 'MULTIPLE_CHOICE_HORIZONTAL',
    FILL_IN_BLANK = 'FILL_IN_BLANK',
    CHOOSE_ANSWER_IN_BLANK = 'CHOOSE_ANSWER_IN_BLANK',
    ESSAY = 'ESSAY',
  }


}

