/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateTestDto = {
  name: string;
  testType: CreateTestDto.testType;
  description?: string;
  randomAnswer?: boolean;
  showSolution?: boolean;
  categoryId: string;
};

export namespace CreateTestDto {

  export enum testType {
    TRY = 'TRY',
    REAL = 'REAL',
  }


}

