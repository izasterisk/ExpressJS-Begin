import { Router } from "express";
import {query, validationResult, body, matchedData, checkSchema} from'express-validator';
import {createUserValidationSchema} from '../utils/validationSchemas.mjs';
import { mockUser } from 'file:///C:/Users/Admin/source/repos/ExpressJS-Begin/src/utils/constants.mjs';
import { findUserByID } from 'file:///C:/Users/Admin/source/repos/ExpressJS-Begin/src/utils/middlewares.mjs';

const router = Router();

router.get('/api/products', (request, response) => {
    response.send([{
        id: 121,
        name: 'Sparrow',
        price: 69
    }]);
});

export default router;