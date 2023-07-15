import express, { Express } from 'express';
import connectDB from './config/db.config';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import { RegisterRoutes } from './routes/routes';

const app: Express = express();
const port = process.env.PORT || 3600;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(express.static('public'));

import swaggerDocument from './routes/swagger.json';
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

RegisterRoutes(app);
const start = async () => {
	await connectDB();

	app.listen(port, () => {
		return console.log(`Express is listening at http://localhost:${port}`);
	});
};

start();
