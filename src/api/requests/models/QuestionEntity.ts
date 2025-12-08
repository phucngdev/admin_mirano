/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EssayAnswerEntity } from './EssayAnswerEntity';
import type { InBlankAnswerDto } from './InBlankAnswerDto';
import type { MatchingAnswerDto } from './MatchingAnswerDto';
import type { MultipleChoiceAnswerDto } from './MultipleChoiceAnswerDto';
import type { MultipleChoiceHorizontalDto } from './MultipleChoiceHorizontalDto';
import type { SortingAnswerDto } from './SortingAnswerDto';

export type QuestionEntity = {
  id: string;
  content: string;
  audioUrl: string;
  imageUrl: string;
  explain: string;
  type: QuestionEntity.type;
  tag: string;
  options: Array<string>;
  sortingAnswers: Array<SortingAnswerDto>;
  multipleChoiceAnswers: Array<MultipleChoiceAnswerDto>;
  matchingAnswers: Array<MatchingAnswerDto>;
  multipleChoiceHorizontal: Array<MultipleChoiceHorizontalDto>;
  fillInBlank: Array<InBlankAnswerDto>;
  chooseAnswerInBlank: Array<InBlankAnswerDto>;
  essayAnswers: Array<EssayAnswerEntity>;
  userAnswers: Array<(MultipleChoiceAnswerDto | MatchingAnswerDto | SortingAnswerDto | MultipleChoiceHorizontalDto | InBlankAnswerDto)>;
};

export namespace QuestionEntity {

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

