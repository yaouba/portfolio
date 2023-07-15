import dotenv from 'dotenv';
dotenv.config();

const env = {
	MongoUri: process.env.MONGO_URI ?? '',
};

export default env;
