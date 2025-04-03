const mongoose = require('mongoose');

const userSchemaRules = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber:{
        type: Number,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    profilePic:{
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: "No Status Available"
    },
    contacts:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserModel"
        }
    ],
    lastSeen: {
        type: Date,
        default: Date.now
    }
},{
    timestamps: true
});

const UserModel = mongoose.model("UserModel", userSchemaRules);

module.exports = UserModel;