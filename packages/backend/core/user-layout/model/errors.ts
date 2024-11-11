export const ModelErrorCodes = {
  UserAlreadyExist: 1000,
  UserFieldRequiere: 1001,
};

export const ModelErrorMessages: { [code: number]: string } = {
  [ModelErrorCodes.UserAlreadyExist]: 'User already exist',
  [ModelErrorCodes.UserFieldRequiere]: 'is required',
};

export class BaseError extends Error {
  public name: string;
  constructor(
    public readonly code: number = -1,
    message = 'Error',
  ) {
    super(message);
    this.message = message;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class UserAlreadyExistError extends BaseError {
  constructor(message = ModelErrorMessages[ModelErrorCodes.UserAlreadyExist]) {
    super(ModelErrorCodes.UserAlreadyExist, `${message}`);
    this.name = this.constructor.name;
  }
}

export class UserFieldRequiereError extends BaseError {
  constructor(field: string) {
    super(
      ModelErrorCodes.UserFieldRequiere,
      `${field} ${ModelErrorMessages[ModelErrorCodes.UserFieldRequiere]}`,
    );
    this.name = this.constructor.name;
  }
}
