"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configService = void 0;
var fs_1 = __importDefault(require("fs"));
var dotenv_1 = __importDefault(require("dotenv"));
if (fs_1.default.existsSync(".env")) {
    console.log("Using .env file to supply config environment variables");
    dotenv_1.default.config({ path: ".env" });
}
else {
    console.log("Using .env.example file to supply config environment variables");
    dotenv_1.default.config({ path: ".env.example" });
}
var ConfigService = /** @class */ (function () {
    function ConfigService() {
        this._port = process.env.PORT;
        this._mongodb_uri = process.env.MONGODB_URI;
        this._auth0_domain = process.env.AUTH0_DOMAIN;
        this._auth0_audience = process.env.AUTH0_AUDIENCE;
        this._machine_to_machine_client_id = process.env.MACHINE_TO_MACHINE_CLIENT_ID;
        this._machine_to_machine_client_secret = process.env.MACHINE_TO_MACHINE_CLIENT_SECRET;
    }
    Object.defineProperty(ConfigService.prototype, "port", {
        get: function () {
            return this._port;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "mongodb_uri", {
        get: function () {
            return this._mongodb_uri;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "auth0_domain", {
        get: function () {
            return this._auth0_domain;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "auth0_audience", {
        get: function () {
            return this._auth0_audience;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "machine_to_machine_client_id", {
        get: function () {
            return this._machine_to_machine_client_id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "machine_to_machine_client_secret", {
        get: function () {
            return this._machine_to_machine_client_secret;
        },
        enumerable: false,
        configurable: true
    });
    return ConfigService;
}());
exports.configService = new ConfigService();
