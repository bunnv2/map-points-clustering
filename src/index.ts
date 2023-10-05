import express from 'express';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const port = process.env.PORT;
const host = process.env.HOST

if (!port && !host) {
    console.log('Please create .env file via command:\x1b[34m npm run create-env \x1b[0m');
    process.exit(1);
}

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server listening at http://${host}:${port}`);
});
