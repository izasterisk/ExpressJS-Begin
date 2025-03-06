import express, { request, response } from 'express';
import {query, validationResult, body, matchedData, checkSchema} from'express-validator';
import {createUserValidationSchema} from './utils/validationSchemas.mjs';
import { mockUser } from 'file:///C:/Users/Admin/source/repos/ExpressJS-Begin/src/utils/constants.mjs';
import { findUserByID } from 'file:///C:/Users/Admin/source/repos/ExpressJS-Begin/src/utils/middlewares.mjs';
import routes from './routes/index.mjs';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const app = express();
app.use(express.json());
app.use(cookieParser("helloworld"));
app.use(session({
    secret: 'helloworld',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60
    }
}));
app.use(routes);

// const loggingMiddleware = (request, response, next) => {
//     console.log(`${request.method} - ${request.url}`);
//     next();
// };

//Use middleware for every functions
//app.use(loggingMiddleware);



const PORT = process.env.PORT || 3000;

//Home page
app.get("/", (request, response) => {
    console.log(request.session);
    console.log(request.session.id);
    request.session.visited = true;
    response.cookie('name', 'express', {maxAge: 60000 * 60, signed: true});
    response.send('Haizz');
});

app.listen(PORT, () => {
    console.log(`Running on port http://localhost:${PORT}`)
});

