import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { json } from 'body-parser';

import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import { currentUserRouter } from './routes/current-user';

import { errorHandler, NotFoundError } from '@crescenttheaters/common';


const app = express();
app.set('trust proxy', true); //running through a proxy set up by ingress that we tell express to trust
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: false,

    })
);

app.use(signInRouter);
app.use(signOutRouter); 
app.use(signUpRouter);
app.use(currentUserRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);


export { app };