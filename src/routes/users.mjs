import { Router } from "express";
import {query, validationResult, body, matchedData, checkSchema} from'express-validator';
import {createUserValidationSchema} from '../utils/validationSchemas.mjs';
import { mockUser } from 'file:///C:/Users/Admin/source/repos/ExpressJS-Begin/src/utils/constants.mjs';
import { findUserByID } from 'file:///C:/Users/Admin/source/repos/ExpressJS-Begin/src/utils/middlewares.mjs';

const router = Router();

//Find user by name and using validate
router.get('/api/users', query('filter').isString().notEmpty().withMessage('Cant be empty').
 isLength({min: 3, max: 10}).withMessage('Too short/long'), (request, response) => {    
    const result = validationResult(request);
    console.log(result);
    const {query: {filter, value}} = request;

    //When filter/value are undefined

    if(filter && value)
        return response.send(mockUser.filter((user) => user[filter].includes(value)));    

    return response.send(mockUser);
});

//Create user
router.post('/api/users', checkSchema(createUserValidationSchema), (request, response) => {
    //Validate data
    const result = validationResult(request);  
    console.log(result);
    if(!result.isEmpty())
        return response.status(400).send({errors: result.array()});
    const data = matchedData(request);

    const newUser = {
        id: mockUser[mockUser.length - 1].id + 1,
        ...data
    };
    mockUser.push(newUser);
    return response.status(201).send(newUser);
});

//Find user by id
router.get('/api/users/:id', findUserByID, (request, response) => {    
    // console.log(request.params);
    // const parseId = parseInt(request.params.id);
    // console.log(parseId);

    // if(isNaN(parseId)) 
    //     return response.status(400).send({ msg: "Bad request. Invalid ID"});

    // const findUser = mockUser.find((user) => user.id === parseId);

    const{findUserId} = request;
    const findUser = mockUser[findUserId];

    if(!findUser){
        return response.sendStatus(404);
    }
    return response.send(findUser);
});

//Update user
router.put('/api/users/:id', findUserByID, (request, response) => {
    //find user
    const{body, findUserId} = request;
    // const parseId = parseInt(id);
    // if(isNaN(parseId))
    //     return response.sendStatus(400);
    // const findUserId = mockUser.findIndex((user) => user.id === parseId);
    // if(findUserId === -1)
    //     return response.sendStatus(404);     

    mockUser[findUserId] = {
        id: mockUser[findUserId].id,
        ...body
    };
    return response.sendStatus(200);
});

//Update partial
router.patch('/api/users/:id', findUserByID, (request, response) => {
    //find user
    const{body, findUserId} = request;
    // const parseId = parseInt(id);
    // if(isNaN(parseId))
    //     return response.sendStatus(400);
    // const findUserId = mockUser.findIndex((user) => user.id === parseId);
    // if(findUserId === -1)
    //     return response.sendStatus(404);    

    mockUser[findUserId] = {
        ...mockUser[findUserId],
        ...body
    };
    return response.sendStatus(200);
});

//Delete user
router.delete('/api/users/:id', findUserByID, (request, response) => {
    const{findUserId} = request;
    mockUser.splice(findUserId, 1);
    return response.sendStatus(200);
});

export default router;