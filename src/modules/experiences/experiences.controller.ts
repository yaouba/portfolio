import { Request as RequestExpress } from 'express';
import {
	Body,
	Delete,
	Get,
	Path,
	Post,
	Put,
	Request,
	Route,
	Security,
	SuccessResponse,
	Tags,
} from 'tsoa';
import {
	EExperience,
	ICreateExperienceInput,
	IExperience,
	IUpdateExperienceInput,
} from './experinces.types';
import Experience from './experiences.model';
import { ErrorResponse, NotFoundError } from '../../utils/errors.utils';
import { Types } from 'mongoose';

@Tags('Experiences')
@Route('experiences')
export class ExperienceController {
	@Get('/')
	public async getAll(): Promise<IExperience[]> {
		const experiences = await Experience.find();
		return experiences;
	}

	@Get('{id}')
	public async getById(@Path() id: string): Promise<IExperience> {
		const experience = await Experience.findById(id);

		if (!experience) {
			throw new NotFoundError('Experience not found');
		}

		return experience;
	}

	@Post('/')
	@Security('Bearer', ['admin'])
	public async store(
		@Request() req: RequestExpress,
		@Body() body: ICreateExperienceInput
	): Promise<IExperience> {
		const {
			title,
			company,
			location,
			description,
			current,
			from,
			to,
			state,
		} = body;

		const newExp = new Experience({
			title,
			company,
			location,
			from: new Date(from),
		});

		if (current) newExp.current = current;
		if (location) newExp.location = location;
		if (description) newExp.description = description;
		if (to) newExp.to = new Date(to);
		if (state)
			newExp.state === 'public'
				? EExperience.Public
				: EExperience.Private;

		try {
			await newExp.save();
		} catch (err: any) {
			throw new ErrorResponse();
		}

		return newExp;
	}

	@Put('{id}')
	@Security('Bearer', ['admin'])
	public async update(
		@Path() id: Types.ObjectId,
		@Body() body: IUpdateExperienceInput
	): Promise<IExperience> {
		const exp = await Experience.findById(id);
		if (!exp) {
			throw new NotFoundError('Experience not found');
		}

		const {
			title,
			company,
			current,
			location,
			description,
			from,
			to,
			state,
		} = body;

		if (title) exp.title = title;
		if (company) exp.company = company;
		if (current) exp.current = current;
		if (location) exp.location = location;
		if (description) exp.description = description;
		if (to) exp.to = new Date(to);
		if (from) exp.from = new Date(from);
		if (state)
			exp.state === 'public' ? EExperience.Public : EExperience.Private;

		try {
			await exp.save();
		} catch (err: any) {
			throw new ErrorResponse();
		}

		return exp;
	}

	@Delete('{id}')
	@SuccessResponse('204', 'Deleted')
	@Security('Bearer', ['admin'])
	public async delete(@Path() id: Types.ObjectId): Promise<void> {
		const exp = await Experience.findById(id);
		if (!exp) {
			throw new NotFoundError('Experience not found');
		}

		await exp.deleteOne();
		return;
	}
}
