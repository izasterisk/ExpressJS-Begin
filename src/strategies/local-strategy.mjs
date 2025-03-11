import passport from "passport";
import {Strategy} from "passport-local";
import { mockUser } from 'file:///C:/Users/Admin/source/repos/ExpressJS-Begin/src/utils/constants.mjs';
import {User} from '../mongoose/schemas/user.mjs';
import { comparePassword } from "../utils/helpers.mjs";

passport.serializeUser((user, done) => {
    console.log('Serialize user');
    console.log(user);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log('Deserialize user');
    console.log(`deserialize id: ${id}`);
    try{
        const findUser = await User.findById(id) //mockUser.find(user => user.id === id);
        if(!findUser) {
            throw new Error('User not found');
        }
        done(null, findUser);
    }catch(err) {
        done(err, null);
    }
});
export default passport.use(new Strategy(//{usernameField: "email"}, (Use email instead of username)
 async (username, password, done) => {
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    try{
        // const findUser = mockUser.find(user => user.username === username);
        // if(!findUser) {
        //     throw new Error('User not found');
        // }
        // if(findUser.password !== password) {
        //     throw new Error('Wrong password');
        // }
        // done(null, findUser);
        const findUser = await User.findOne({username});
        if(!findUser) {
            throw new Error('User not found');
        }
        const isPasswordValid = await comparePassword(password, findUser.password);
            if (!isPasswordValid) {
                throw new Error('Wrong password');
            }
        done(null, findUser);
    }catch(error) {
        done(error, null);
    } 
}));