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
	EEducation,
	ICreateEducationInput,
	IEducation,
	IUpdateEducationInput,
} from './educations.types';
import Education from './educations.model';
import { ErrorResponse, NotFoundError } from '../../utils/errors.utils';
import { Types } from 'mongoose';

@Tags('Educations')
@Route('educations')
export class EducationController {
	@Get('/')
	public async getAll(): Promise<IEducation[]> {
		const educations = await Education.find();
		return educations;
	}

	@Get('{id}')
	public async getById(@Path() id: string): Promise<IEducation> {
		const education = await Education.findById(id);

		if (!education) {
			throw new NotFoundError('Education not found');
		}

		return education;
	}

	@Post('/')
	@Security('Bearer', ['admin'])
	public async store(
		@Request() req: RequestExpress,
		@Body() body: ICreateEducationInput
	): Promise<IEducation> {
		const {
			title,
			school,
			degree,
			fieldOfStudy,
			location,
			description,
			from,
			to,
			state,
		} = body;

		const newEdu = new Education({
			title,
			fieldOfStudy,
			school,
			from: new Date(from),
		});

		if (degree) newEdu.degree = degree;
		if (location) newEdu.location = location;
		if (description) newEdu.description = description;
		if (to) newEdu.to = new Date(to);
		if (state)
			newEdu.state === 'public' ? EEducation.Public : EEducation.Private;

		try {
			await newEdu.save();
		} catch (err: any) {
			throw new ErrorResponse();
		}

		return newEdu;
	}

	@Put('{id}')
	@Security('Bearer', ['admin'])
	public async update(
		@Path() id: Types.ObjectId,
		@Body() body: IUpdateEducationInput
	): Promise<IEducation> {
		const edu = await Education.findById(id);
		if (!edu) {
			throw new NotFoundError(';Eduction not found');
		}

		const {
			title,
			school,
			degree,
			fieldOfStudy,
			location,
			description,
			from,
			to,
			state,
		} = body;

		if (title) edu.title = title;
		if (school) edu.school = school;
		if (degree) edu.degree = degree;
		if (location) edu.location = location;
		if (fieldOfStudy) edu.fieldOfStudy = fieldOfStudy;
		if (description) edu.description = description;
		if (to) edu.to = new Date(to);
		if (from) edu.from = new Date(from);
		if (state)
			edu.state === 'public' ? EEducation.Public : EEducation.Private;

		try {
			await edu.save();
		} catch (err: any) {
			throw new ErrorResponse();
		}

		return edu;
	}

	@Delete('{id}')
	@SuccessResponse('204', 'Deleted')
	@Security('Bearer', ['admin'])
	public async delete(@Path() id: Types.ObjectId): Promise<void> {
		const edu = await Education.findById(id);
		if (!edu) {
			throw new NotFoundError('Eduction not found');
		}

		await edu.deleteOne();
		return;
	}
}
