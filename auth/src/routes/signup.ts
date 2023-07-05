import express, {Request, Response} from 'express';
import { body } from 'express-validator'; 
import { sign } from 'jsonwebtoken';

import { BadRequestError, validateRequest } from '@crescenttheaters/common';

import { User } from '../models/user';

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage("Email must be valid"),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20})
        .withMessage("Password must be between 4 and 20 characters")
],
validateRequest, //Middleware checks to see if any errors occured to throw back to client
async (req: Request, res: Response) => {

    const {email, password} = req.body;

    const existingUser = await User.findOne({email});

    if(existingUser){
       throw new BadRequestError('Email already in use'); 
    }

    const user = User.build({
       email,
       password 
    });
    await user.save();

    // generate jwt to store it on req session obj
    const userJwt = sign({
        id: user.id, 
        email: user.email
    }, process.env.JWT_KEY!);

    //store in req session
    req.session = {  // req.session.jwt not recognized in ts so created new obj with field jwt for userJwt
        jwt: userJwt
    };

    res.status(201).send(user);

});

export {router as signUpRouter}; 