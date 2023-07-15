import mongoose from 'mongoose';
import env from './env.config';

export default async () => {
	try {
		await mongoose.connect(env.MongoUri);
		console.log('Database connected...');
	} catch (error: any) {
		console.error(error.message);
		process.exit(1);
	}
};
