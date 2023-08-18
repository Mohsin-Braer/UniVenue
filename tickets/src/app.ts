import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { json } from 'body-parser';
import { errorHandler, NotFoundError, currentUser } from '@crescenttheaters/common';

import { createTicketRouter } from './routes/new';
import { showTicketsRouter } from './routes/show';
import { indexTicketsRouter } from './routes/index';
import { updateTicketRouter } from './routes/update';


const app = express();
app.set('trust proxy', true); //running through a proxy set up by ingress that we tell express to trust
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: false,
    })
);
app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketsRouter);
app.use(indexTicketsRouter);
app.use(updateTicketRouter);



app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);


export { app };