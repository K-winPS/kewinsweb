const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validator(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email ID");
            }
        }
    },
    phone: {
        type: Number,
        required: true,
        min: 10
    },
    description: {
        type: String,
        required: true
    },
})

//collection create

const User=mongoose.model("User",userSchema);

module.exports=User;

