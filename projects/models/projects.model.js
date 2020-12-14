"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
var mongoose_1 = require("mongoose");
var ProjectSchema = new mongoose_1.Schema({
    projectName: {
        type: String,
        required: true
    },
    projectCode: {
        type: String,
        required: true
    },
    projectStatus: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        virtuals: true
    }
});
ProjectSchema.virtual("projectNameCode").get(function () {
    return this.projectName + " - " + this.projectCode;
});
exports.Project = mongoose_1.model('Project', ProjectSchema);
