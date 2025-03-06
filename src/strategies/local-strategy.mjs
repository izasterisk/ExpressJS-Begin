import passport from "passport";
import {Strategy} from "passport-local";

passport.use(new Strategy(//{usernameField: "email"}, (Use email instead of username)
 (username, password, done) => {
    try{
        const findUser = mockUser.find(user => user.username === username);
        if(!findUser) {
            throw new Error('User not found');
        }
        if(findUser.password !== password) {
            throw new Error('Wrong password');
        }
    }catch(error) {
        done(error, null);
    } 
}));