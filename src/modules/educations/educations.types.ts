import { Model, Types } from 'mongoose';

export enum EEducation {
	Public = 'public',
	Private = 'private',
}

export interface ITest {
	id: Types.ObjectId;
}

export interface IEducation extends ICreateEducationInput {
	id: Types.ObjectId;
	title: string;
	school: string;
	degree: string;
	fieldOfStudy: string;
	location: string;
	description: string;
	from: Date;
	to: Date;
	state: EEducation;
	createdAt: Date;
	updatedAt: Date;
}

export interface IEducationModel extends Model<IEducation> {}

export interface ICreateEducationInput {
	title: string;
	school: string;
	degree?: string;
	fieldOfStudy: string;
	location?: string;
	description?: string;
	from: Date;
	to?: Date;
	state?: EEducation;
}

export interface IUpdateEducationInput {
	title?: string;
	school?: string;
	degree?: string;
	fieldOfStudy?: string;
	location?: string;
	description?: string;
	from?: Date;
	to?: Date;
	state?: EEducation;
}
