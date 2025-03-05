import express, { request, response } from 'express';
import {query, validationResult, body, matchedData, checkSchema} from'express-validator';
import {createUserValidationSchema} from './utils/validationSchemas.mjs';
import { mockUser } from 'file:///C:/Users/Admin/source/repos/ExpressJS-Begin/src/utils/constants.mjs';
import { findUserByID } from 'file:///C:/Users/Admin/source/repos/ExpressJS-Begin/src/utils/middlewares.mjs';
import routes from './routes/index.mjs';


const app = express();
app.use(express.json());
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
    response.send('Haizz');
});

app.listen(PORT, () => {
    console.log(`Running on port http://localhost:${PORT}`)
});

