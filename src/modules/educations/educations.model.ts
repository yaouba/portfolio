import { model } from 'mongoose';
import { IEducation, IEducationModel } from './educations.types';
import { MODULE_NAME_EDUCATION } from './educations.config';
import EducationSchema from './educations.schema';

const Education = model<IEducation, IEducationModel>(
	MODULE_NAME_EDUCATION,
	EducationSchema
);

export default Education;
