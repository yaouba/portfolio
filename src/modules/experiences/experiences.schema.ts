import { Schema } from 'mongoose';
import { EExperience, IExperience } from './experinces.types';

const ExperienceSchema = new Schema<IExperience>({
	title: { type: String, required: true },
	company: { type: String, required: true },
	location: { type: String, required: true },
	description: { type: String },
	from: { type: Date, required: true },
	to: { type: Date },
	state: {
		type: String,
		enum: Object.values(EExperience),
		default: EExperience.Private,
	},
	current: {
		type: Boolean,
		default: true,
	},
	createdAt: { type: Date, default: Date.now },
});

export default ExperienceSchema;
