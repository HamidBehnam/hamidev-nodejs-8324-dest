"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = exports.profilesProjection = void 0;
var mongoose_1 = require("mongoose");
var ProfileSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        virtuals: true
    },
    id: false
});
exports.profilesProjection = {
    lastName: true,
    firstName: true,
    fullName: true
};
ProfileSchema.virtual('fullName').get(function () {
    return this.firstName + " " + this.lastName;
});
exports.Profile = mongoose_1.model('Profile', ProfileSchema);
