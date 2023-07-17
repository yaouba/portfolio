import express, { Express, Response, Request, NextFunction } from 'express';
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

app.use(function notFoundHandler(_req, res: Response) {
	res.status(404).send({
		message: 'Not Found',
	});
});

app.use(function errorHandler(
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
): Response | void {
	const locals = {
		name: err.name,
		message: err.message,
		details: err.details,
	};

	if ('fields' in err) {
		const details: Record<string, any> = {};

		for (const key in err.fields) {
			// lets remove the body. when validating body
			if (key.startsWith('body.')) {
				details[key.substring(5)] = err.fields[key];
			} else {
				details[key] = err.fields[key];
			}
		}
		locals.message = Object.values(details)[0].message;
	}

	res.status(err.status || 500);
	res.json(locals);

	next();
});

const start = async () => {
	await connectDB();

	app.listen(port, () => {
		return console.log(`Express is listening at http://localhost:${port}`);
	});
};

start();
