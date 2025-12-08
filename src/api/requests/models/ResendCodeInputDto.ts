/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ResendCodeInputDto = {
  email: string;
  action: ResendCodeInputDto.action;
};

export namespace ResendCodeInputDto {

  export enum action {
    REGISTER = 'REGISTER',
    RESET_PASSWORD = 'RESET_PASSWORD',
  }


}

