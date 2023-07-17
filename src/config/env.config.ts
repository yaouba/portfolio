import dotenv from 'dotenv';
dotenv.config();

const env = {
	MongoUri: process.env.MONGO_URI ?? '',
	JwtSecret: process.env.JWT_SECRET ?? '',
};

export default env;
