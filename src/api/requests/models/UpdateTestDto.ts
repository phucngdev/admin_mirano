/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateTestDto = {
  name: string;
  testType: UpdateTestDto.testType;
  description: string;
  randomAnswer: boolean;
  showSolution: boolean;
};

export namespace UpdateTestDto {

  export enum testType {
    TRY = 'TRY',
    REAL = 'REAL',
  }


}

