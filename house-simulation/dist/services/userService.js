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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePin = validatePin;
exports.getUserPinAttempts = getUserPinAttempts;
exports.registerUserService = registerUserService;
const pinAttempt_1 = require("../models/pinAttempt");
const user_1 = require("../models/user");
function validatePin(userId, pin) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, user_1.findUserById)(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const success = user.pin === pin;
        yield (0, pinAttempt_1.logPinAttempt)(userId, pin, success);
        return success;
    });
}
function getUserPinAttempts(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, pinAttempt_1.getPinAttempts)(userId);
    });
}
function registerUserService(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield (0, user_1.findUserByUsername)(user.username);
        if (existingUser) {
            throw new Error('Username already exists');
        }
        const existingEmail = yield (0, user_1.findUserByEmail)(user.email);
        if (existingEmail) {
            throw new Error('Email already in use');
        }
        yield (0, user_1.registerUser)(user);
    });
}
