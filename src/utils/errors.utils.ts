import { StatusCodes } from 'http-status-codes';

export interface IErrorResponse<T = string> {
	status: number;
	message: string;
	details: ValidationFieldErrors<T>;
}

/**
 * General Error Object, gets other props from Error which include
 *
 * name, message, stack
 */

export interface IErrorResponse<T = string> {
	status: number;
	message: string;
	details: ValidationFieldErrors<T>;
}

/**
 * General Error Object, gets other props from Error which include
 *
 * name, message, stack
 */

export class ErrorResponse extends Error {
	constructor(
		public message = 'Internal Server Error',
		public status = StatusCodes.INTERNAL_SERVER_ERROR,
		public details?: ValidationFieldErrors<string> | unknown
	) {
		super(message);
		this.status = status || this.status;
	}
}

export type ValidationFieldErrors<T> = {
	[K in keyof T]?: string | ValidationFieldErrors<any>;
};

export class ValidationError extends ErrorResponse {
	constructor(message = 'Input Validation Error') {
		super(message, StatusCodes.BAD_REQUEST);
	}
}

export class AuthorizationError extends ErrorResponse {
	name = 'AuthorizationError';
	status = StatusCodes.UNAUTHORIZED;

	constructor(public message: string, public details?: any) {
		super(message, details);
	}
}

export class NotFoundError extends ErrorResponse {
	name = 'NotFoundError';
	status = StatusCodes.NOT_FOUND;

	constructor(public message: string, public details?: any) {
		super(message, details);
	}
}

export class ForbiddenError extends ErrorResponse {
	name = 'ForbiddenError';
	status = StatusCodes.FORBIDDEN;

	constructor(public message: string, public details?: any) {
		super(message, details);
	}
}
