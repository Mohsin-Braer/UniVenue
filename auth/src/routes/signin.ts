import express, {Request, Response} from 'express';
import { body, } from 'express-validator';
import { sign } from 'jsonwebtoken';

import { BadRequestError, validateRequest } from '@crescenttheaters/common';
import { Password } from '../services/password';

import { User } from '../models/user';


const router = express.Router();

router.post('/api/users/signin', [
    body('email')
        .isEmail()
        .withMessage("Email must be valid"),
    body('password')
        .trim()
        .notEmpty()
        .withMessage("Password field must be given")
], 
validateRequest, //Middleware checks to see if any errors occured to throw back to client
async (req: Request, res: Response) => {

    const {email, password} = req.body;

    const existingUser = await User.findOne({email});

    if(!existingUser){
        throw new BadRequestError('Invalid email or password');   
    }

    const passMatch = await Password.compareTo(existingUser.password, password);

    if(!passMatch){
        throw new BadRequestError("Invalid email or password");
    }


    const userJwt = sign({
        id: existingUser.id,
        email: existingUser.email
    }, process.env.JWT_KEY!);

    req.session = {
        jwt: userJwt
    };

    res.status(201).send(existingUser);
   
});

export {router as signInRouter}; 