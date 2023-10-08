import { create } from 'express-handlebars';
import { Request, Response } from 'express';
import express from 'express';
import dotenv from 'dotenv';
// routes
import locationsRouter from './routes/locations';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const handlebars = create();

const port = process.env.PORT;
const host = process.env.HOST

if (!port && !host) {
    console.log('Please create .env file via command:\x1b[34m npm run create-env \x1b[0m');
    process.exit(1);
}

app.use(bodyParser.json());
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.get('/', (req: Request, res: Response) => {
    res.render('map')
});

app.use('/locations', locationsRouter)

app.listen(port, () => {
    console.log(`Server listening at http://${host}:${port}`);
});
