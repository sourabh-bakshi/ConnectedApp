const mongoose = require('mongoose');

const userSchemaRules = mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        sparse: true,
    },
    googleId:{
        type: String,
        unique: true,
        sparse: true
    },   
    appleId:{
        type: String,
        unique: true,
        sparse: true
    }, 
    phoneNumber:{
        type: String,
        unique: true,
        sparse: true,
    },
    email:{
        type: String,
        unique: true,
        sparse: true,
    },
    password:{
        type: String,        
        sparse: true,        
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

UserModel.pre("save", function(next){
    
})

module.exports = UserModel;