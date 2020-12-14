"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profilesRoutesConfig = void 0;
var profilesController = __importStar(require("./controllers/profiles.controller"));
var auth_service_1 = require("../common/services/auth.service");
var profilesRoutesConfig = function (app) {
    app.post('/profiles', [
        auth_service_1.authService.jwtCheck,
        profilesController.createProfile
    ]);
    app.get('/profiles', [
        auth_service_1.authService.jwtCheck,
        profilesController.getProfiles
    ]);
    app.get('/profiles/my', [
        auth_service_1.authService.jwtCheck,
        profilesController.getMyProfile
    ]);
    app.get('/profiles/:id', [
        auth_service_1.authService.jwtCheck,
        profilesController.getProfile
    ]);
};
exports.profilesRoutesConfig = profilesRoutesConfig;
