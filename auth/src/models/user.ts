import mongoose from "mongoose";
import { Password } from "../services/password";

// Properties required to make a new User
interface UserAttrs {
    email: string;
    password: string;
}

//interface for properties of User Model
interface UserModel extends mongoose.Model<UserDoc>{
    build(attrs: UserAttrs): UserDoc;
}

//interface for properties of User document
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email:{
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    name: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: false
    }
},{
   toJSON: {       //Use this to remove the password and __v field from the User doc that is returned back to the client
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
   } 
});

userSchema.pre('save', async function(done){  // Any time we call User.save() this function will be performed before the actual save
    if(this.isModified('password')){
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);   
    }  
    done();  
});

userSchema.statics.build = (attrs: UserAttrs) => {  //custom function built into Schema
    return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema); 


export {User};