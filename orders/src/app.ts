import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { json } from 'body-parser';
import { errorHandler, NotFoundError, currentUser } from '@crescenttheaters/common';

import { newOrderRouter } from './routes/new';
import { deleteOrderRouter } from './routes/delete';
import { indexOrderRouter } from './routes/index';
import { showOrderRouter } from './routes/show';

const app = express();
app.set('trust proxy', true); //running through a proxy set up by ingress that we tell express to trust
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test', //set to false if in test env in order to be able to test if cookies can be sent

    })
);
app.use(currentUser);

app.use(newOrderRouter);
app.use(deleteOrderRouter);
app.use(showOrderRouter);
app.use(indexOrderRouter);



app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);


export { app };