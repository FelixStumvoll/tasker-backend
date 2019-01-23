import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { saltRounds } from '../config';
import passwordRules from '../utils';
import '@babel/polyfill';

const Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    }
});

userSchema.methods.hashPassword = async function(plaintext) {
    let hash = await bcrypt.hash(plaintext, saltRounds);
    this.passwordHash = hash;
};

userSchema.methods.comparePassword = async function(plaintext) {
    return await bcrypt.compare(plaintext, this.passwordHash);
};

userSchema.statics.isPasswordValid = plaintext => {
    for (let i = 0; i < passwordRules.length; i++) {
        if (!new RegExp(passwordRules[i]).test(plaintext)) {
            return false;
        }
    }
    return true;
};

let userModel = mongoose.model('User', userSchema);

export { userSchema, userModel };
