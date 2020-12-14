"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
var express_jwt_1 = __importDefault(require("express-jwt"));
var jwks_rsa_1 = __importDefault(require("jwks-rsa"));
var jwt_decode_1 = __importDefault(require("jwt-decode"));
var config_service_1 = require("./config.service");
var axios = require("axios");
var AuthService = /** @class */ (function () {
    function AuthService() {
        this.machineToMachineAccessToken = '';
        this._jwtCheck = express_jwt_1.default({
            secret: jwks_rsa_1.default.expressJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: "https://" + config_service_1.configService.auth0_domain + "/.well-known/jwks.json"
            }),
            audience: config_service_1.configService.auth0_audience,
            issuer: "https://" + config_service_1.configService.auth0_domain + "/",
            algorithms: ['RS256']
        });
    }
    Object.defineProperty(AuthService.prototype, "jwtCheck", {
        get: function () {
            return this._jwtCheck;
        },
        enumerable: false,
        configurable: true
    });
    AuthService.checkTokenExpiration = function (decodedToken) {
        return decodedToken.exp * 1000 > Date.now();
    };
    AuthService.prototype.getMachineToMachineAccessToken = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.machineToMachineAccessToken && AuthService.checkTokenExpiration(jwt_decode_1.default(_this.machineToMachineAccessToken))) {
                // re using the cached token
                resolve(_this.machineToMachineAccessToken);
            }
            else {
                console.log('connecting to the auth0 server to get the token.............');
                var options = {
                    method: 'POST',
                    url: "https://" + config_service_1.configService.auth0_domain + "/oauth/token",
                    headers: { 'content-type': 'application/json' },
                    data: {
                        grant_type: 'client_credentials',
                        client_id: config_service_1.configService.machine_to_machine_client_id,
                        client_secret: config_service_1.configService.machine_to_machine_client_secret,
                        audience: "https://" + config_service_1.configService.auth0_domain + "/api/v2/"
                    }
                };
                axios.default.request(options).then(function (response) {
                    _this.machineToMachineAccessToken = response.data.access_token;
                    resolve(_this.machineToMachineAccessToken);
                }).catch(function (error) {
                    reject(error);
                });
            }
        });
    };
    AuthService.prototype.updateMetaData = function (userId, metadata) {
        return __awaiter(this, void 0, void 0, function () {
            var token, userPatchOptions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getMachineToMachineAccessToken()];
                    case 1:
                        token = _a.sent();
                        userPatchOptions = {
                            method: 'PATCH',
                            url: "https://" + config_service_1.configService.auth0_domain + "/api/v2/users/" + userId,
                            headers: { 'content-type': 'application/json', 'authorization': 'Bearer ' + token },
                            data: metadata
                        };
                        return [2 /*return*/, axios.default.request(userPatchOptions)];
                }
            });
        });
    };
    return AuthService;
}());
exports.authService = new AuthService();
