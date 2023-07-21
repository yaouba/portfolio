import { Model, Types } from 'mongoose';

export enum EExperience {
	Public = 'public',
	Private = 'private',
}

export interface IExperience extends ICreateExperienceInput {
	id: Types.ObjectId;
	title: string;
	company: string;
	location: string;
	description: string;
	from: Date;
	to: Date;
	current: boolean;
	state: EExperience;
	createdAt: Date;
}

export interface IExperienceModel extends Model<IExperience> {}

export interface ICreateExperienceInput {
	title: string;
	company: string;
	location: string;
	description?: string;
	from: Date;
	to?: Date;
	current: boolean;
	state?: EExperience;
}

export interface IUpdateExperienceInput {
	title?: string;
	company?: string;
	location?: string;
	description?: string;
	from?: Date;
	to?: Date;
	current: boolean;
	state?: EExperience;
}
