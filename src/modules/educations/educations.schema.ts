import { Schema } from 'mongoose';
import { EEducation, IEducation } from './educations.types';

const EducationSchema = new Schema<IEducation>({
	title: { type: String, required: true },
	school: { type: String, required: true },
	degree: { type: String },
	location: { type: String },
	fieldOfStudy: { type: String, required: true },
	description: { type: String },
	from: { type: Date, required: true },
	to: { type: Date },
	state: {
		type: String,
		enum: Object.values(EEducation),
		default: EEducation.Private,
	},
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

export default EducationSchema;
