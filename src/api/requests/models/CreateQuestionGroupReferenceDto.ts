/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateQuestionGroupReferenceDto = {
  questionGroupIds: Array<string>;
  testDetailId?: string;
  examId?: string;
  type: CreateQuestionGroupReferenceDto.type;
};

export namespace CreateQuestionGroupReferenceDto {

  export enum type {
    TEST_DETAIL = 'TEST_DETAIL',
    EXAM = 'EXAM',
  }


}

