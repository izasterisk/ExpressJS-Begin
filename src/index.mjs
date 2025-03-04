import express, { request, response } from 'express';
import {query, validationResult, body, matchedData, checkSchema} from'express-validator';
import {createUserValidationSchema} from './utils/validationSchemas.js';

const app = express();
app.use(express.json());

const loggingMiddleware = (request, response, next) => {
    console.log(`${request.method} - ${request.url}`);
    next();
};

//Use middleware for every functions
//app.use(loggingMiddleware);

const findUserByID = (request, response, next) =>{
    //find user
    const{body, params:{id}} = request;
    const parseId = parseInt(id);
    if(isNaN(parseId))
        return response.sendStatus(400);
    const findUserId = mockUser.findIndex((user) => user.id === parseId);
    if(findUserId === -1)
        return response.sendStatus(404);
    request.findUserId = findUserId;
    next();
}

const PORT = process.env.PORT || 3000;
const mockUser = [{
    id: 1,
    username: 'Wxrdie',
    displayName: 'Pham Nam Hai'
},
{
    id: 2,
    username: 'MCK',
    displayName: 'A Long'
}];

//Home page
app.get("/", (request, response) => {
    response.send('Haizz');
});

app.get('/api/products', (request, response) => {
    response.send([{
        id: 121,
        name: 'Sparrow',
        price: 69
    }]);
});

//Find user by name and using validate
app.get('/api/users', query('filter').isString().notEmpty().withMessage('Cant be empty').
 isLength({min: 3, max: 10}).withMessage('Too short/long'), (request, response) => {    
    const result = validationResult(request);
    console.log(result);
    const {query: {filter, value}} = request;

    //When filter/value are undefined

    if(filter && value)
        return response.send(mockUser.filter((user) => user[filter].includes(value)));    

    return response.send(mockUser);
});

//Find user by id
app.get('/api/users/:id', findUserByID, (request, response) => {    
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

//Create user
app.post('/api/users', checkSchema(createUserValidationSchema), (request, response) => {
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

//Update user
app.put('/api/users/:id', findUserByID, (request, response) => {
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
app.patch('/api/users/:id', findUserByID, (request, response) => {
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
app.delete('/api/users/:id', findUserByID, (request, response) => {
    const{findUserId} = request;
    mockUser.splice(findUserId, 1);
    return response.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Running on port http://localhost:${PORT}`)
});