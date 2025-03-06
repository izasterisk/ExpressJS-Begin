import { Router } from "express";
import {query, validationResult, body, matchedData, checkSchema} from'express-validator';
import {createUserValidationSchema} from '../utils/validationSchemas.mjs';
import { mockUser } from 'file:///C:/Users/Admin/source/repos/ExpressJS-Begin/src/utils/constants.mjs';
import { findUserByID } from 'file:///C:/Users/Admin/source/repos/ExpressJS-Begin/src/utils/middlewares.mjs';

const router = Router();

router.get('/api/products', (request, response) => {
    console.log(request.headers.cookie);
    console.log(request.cookies);
    console.log(request.signedCookies.name);
    if(request.signedCookies.name && request.signedCookies.name === 'express') {
        response.send([{
            id: 121,
            name: 'Sparrow',
            price: 69
        }]);
    }
    return response.status(401).send('Unauthorized');
});

export default router;