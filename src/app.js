import cors from 'cors';
import express from 'express';
import singUp from './controllers/signUpController.js';
import signIn from './controllers/signInController.js';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/sign-up', singUp);
app.post('/sign-in', signIn);

export default app;