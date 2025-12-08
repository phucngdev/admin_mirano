/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type VerifyCodeInputDto = {
  email: string;
  action: VerifyCodeInputDto.action;
  verifyCode: string;
};

export namespace VerifyCodeInputDto {

  export enum action {
    REGISTER = 'REGISTER',
    RESET_PASSWORD = 'RESET_PASSWORD',
  }


}

