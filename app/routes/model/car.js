"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var carSchema = new mongoose.Schema({
    make: {
        type: String,
        maxlength: 50,
        required: true
    },
    carModel: {
        type: String,
        maxlength: 50,
        required: true
    },
    year: {
        type: Number,
        min: 1900,
        max: 2050,
        minlength: 4,
        maxlength: 4,
        required: true
    }
});
exports.default = mongoose.model('Car', carSchema);
