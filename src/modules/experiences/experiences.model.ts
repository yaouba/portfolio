import { model } from 'mongoose';
import { IExperience, IExperienceModel } from './experinces.types';
import { MODULE_NAME_EXPERIENCE } from './experiences.config';
import ExperienceSchema from './experiences.schema';

const Experience = model<IExperience, IExperienceModel>(
	MODULE_NAME_EXPERIENCE,
	ExperienceSchema
);

export default Experience;
