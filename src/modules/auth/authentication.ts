import { Request } from 'express';
import { AuthorizationError } from '../../utils/errors.utils';
import { ReasonPhrases } from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import env from '../../config/env.config';
import { IUserPayload, SecureRequest } from '../../types';

export async function expressAuthentication(
	request: Request,
	securityName: string,
	scopes?: string[]
): Promise<void> {
	if (securityName === 'Bearer') {
		const bearerToken = request.header('authorization');
		if (!bearerToken)
			throw new AuthorizationError(ReasonPhrases.UNAUTHORIZED);
		const token = bearerToken.split(' ')[1];
		if (!token) throw new AuthorizationError(ReasonPhrases.UNAUTHORIZED);

		try {
			const decoded = jwt.verify(token, env.JwtSecret) as IUserPayload;
			(request as SecureRequest).user = decoded;
		} catch (error) {
			throw new AuthorizationError(ReasonPhrases.UNAUTHORIZED);
		}
	}

	return Promise.resolve();
}
