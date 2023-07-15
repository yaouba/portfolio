declare namespace Express {
	export interface Request {
		user: {
			id: ObjectId;
			roles: [string];
		};
	}
	export interface Response {
		user: any;
	}
}
