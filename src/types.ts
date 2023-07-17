import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { ObjectId } from 'mongoose';

export type SecureRequest = Request & {
	user: IUserPayload;
};

export interface IJWTPayload extends JwtPayload {
	user: IUserPayload;
}

export interface IUserPayload {
	id: ObjectId;
	roles: string[];
}
