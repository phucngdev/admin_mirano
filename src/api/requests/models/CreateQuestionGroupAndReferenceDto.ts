/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateQuestionGroupAndReferenceDto = {
  content?: string | null;
  imageUrl?: string | null;
  audioUrl?: string | null;
  questions?: Array<string> | null;
  examId: string;
  type: CreateQuestionGroupAndReferenceDto.type;
  testDetailId: string;
};

export namespace CreateQuestionGroupAndReferenceDto {

  export enum type {
    TEST_DETAIL = 'TEST_DETAIL',
    EXAM = 'EXAM',
  }


}

