const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Student', 'Alumni'],
        required: true
    }
});

userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({_id: this._id}, process.env.SECRET_KEY,{expiresIn: '7d'});
    return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
    const schema = joi.object({
        firstname: joi.string().required().label("First Name"),
        lastname: joi.string().required().label("Last Name"),
        email: joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
        role: joi.string().valid('Student', 'Alumni').required().label("Role")
    });
    return schema.validate(data);
}

module.exports = {User, validate}