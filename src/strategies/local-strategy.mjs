import passport from "passport";
import {Strategy} from "passport-local";
import { mockUser } from 'file:///C:/Users/Admin/source/repos/ExpressJS-Begin/src/utils/constants.mjs';

passport.serializeUser((user, done) => {
    console.log('Serialize user');
    console.log(user);
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log('Deserialize user');
    console.log(`deserialize id: ${id}`);
    try{
        const findUser = mockUser.find(user => user.id === id);
        if(!findUser) {
            throw new Error('User not found');
        }
        done(null, findUser);
    }catch(err) {
        done(err, null);
    }
});
export default passport.use(new Strategy(//{usernameField: "email"}, (Use email instead of username)
 (username, password, done) => {
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    try{
        const findUser = mockUser.find(user => user.username === username);
        if(!findUser) {
            throw new Error('User not found');
        }
        if(findUser.password !== password) {
            throw new Error('Wrong password');
        }
        done(null, findUser);
    }catch(error) {
        done(error, null);
    } 
}));