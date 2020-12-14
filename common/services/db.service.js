"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbService = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var config_service_1 = require("./config.service");
var DbService = /** @class */ (function () {
    function DbService() {
    }
    DbService.prototype.connectDB = function () {
        var dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };
        mongoose_1.default.connect(config_service_1.configService.mongodb_uri, dbOptions)
            .then(function () {
            console.log("successfully connected to the DB");
        }).catch(function (error) {
            console.log("unable to connect to the DB", error);
        });
    };
    ;
    return DbService;
}());
exports.dbService = new DbService();
