import express, { request, response } from 'express';
import {query, validationResult, body, matchedData, checkSchema} from'express-validator';
import {createUserValidationSchema} from './utils/validationSchemas.mjs';
import { mockUser } from 'file:///C:/Users/Admin/source/repos/ExpressJS-Begin/src/utils/constants.mjs';
import { findUserByID } from 'file:///C:/Users/Admin/source/repos/ExpressJS-Begin/src/utils/middlewares.mjs';
import routes from './routes/index.mjs';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import mongoose from 'mongoose';
import './strategies/local-strategy.mjs';

const app = express();

mongoose.connect("mongodb://localhost:27017/ExpressJSBegin").then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

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
app.use(passport.initialize());
app.use(passport.session());
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

// app.post("/api/auth", (request, response) => {
//     const {body: {username, password}} = request;
//     const findUser = mockUser.find(user => user.username === username);
//     if(!findUser || findUser.password !== password) {
//         response.status(401).send('Wrong username or password');
//         return;
//     }
//     request.session.user = findUser;
//     return response.status(200).send(findUser);
// });

// app.get("/api/auth/status", (request, response) => {
//     request.sessionStore.get(request.session.id, (err, session) => {
//         if(err) {
//             console.log(err);
//             throw err;
//         }
//         console.log(session);
//     });
//     return request.session.user ? 
//         response.status(200).send(request.session.user) : response.status(401).send('Unauthorized');

// });

app.post("/api/cart", (request, response) => {
    if(!request.session.user) {
        return response.status(401).send('Unauthorized');
    }
    const {body: item} = request;
    const {cart} = request.session;
    if(cart) {
        cart.push(item);
    }else{
        request.session.cart = [item];
    }
    return response.status(201).send(item);
});

app.get("/api/cart", (request, response) => {
    if(!request.session.user) {
        return response.status(401).send('Unauthorized');
    }
    return response.status(200).send(request.session.cart ?? []);
});

app.post("/api/auth", passport.authenticate("local"), (request, response) => {
    response.status(200).send(request.user);
});

app.get("/api/auth/status", (request, response) => {
    console.log(request.user);
    if(request.user) {
        return response.status(200).send(request.user);
    }
    return response.status(401).send('Unauthorized');
});

app.post("/api/auth/logout", (request, response) => {
    if(!request.user) {
        return response.status(401).send('Unauthorized');
    }
    request.logout((err) => {
        if(err) {
            return response.status(500).send('Logout failed');
        }
    });
    response.status(200).send('Logout successfully');
});

app.listen(PORT, () => {
    console.log(`Running on port http://localhost:${PORT}`)
});

