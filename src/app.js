import cors from 'cors';
import express from 'express';
import auth from './middleware/auth.js';
import singUp from './controllers/signUpController.js';
import signIn from './controllers/signInController.js';
import getMessages from './controllers/getMessages.js';
import getName from './controllers/getName.js';
import postMessage from './controllers/postMessage.js';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/sign-up', singUp);
app.post('/sign-in', signIn);
app.post('/name', getName);
app.post('/post-message', postMessage);

app.get('/messages', auth, getMessages);

export default app;