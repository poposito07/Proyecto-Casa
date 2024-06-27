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
exports.registerUser = registerUser;
exports.validateUserPin = validateUserPin;
exports.getUserPinAttemptsController = getUserPinAttemptsController;
const userService_1 = require("../services/userService");
function registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password, email, pin } = req.body;
        const newUser = {
            username,
            password,
            email,
            pin,
        };
        try {
            yield (0, userService_1.registerUserService)(newUser);
            res.json({ message: 'User registered successfully' });
        }
        catch (error) {
            console.error('Error registering user:', error);
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            }
            else {
                res.status(400).json({ message: 'An unknown error occurred' });
            }
        }
    });
}
function validateUserPin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId, pin } = req.body;
        try {
            const isValid = yield (0, userService_1.validatePin)(userId, pin);
            res.json({ isValid });
        }
        catch (error) {
            console.error('Error validating PIN:', error);
            if (error instanceof Error) {
                res.status(500).json({ message: 'Failed to validate PIN', error: error.message });
            }
            else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    });
}
function getUserPinAttemptsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = parseInt(req.params.userId);
        try {
            const attempts = yield (0, userService_1.getUserPinAttempts)(userId);
            res.json(attempts);
        }
        catch (error) {
            console.error('Error fetching PIN attempts:', error);
            if (error instanceof Error) {
                res.status(500).json({ message: 'Failed to fetch PIN attempts', error: error.message });
            }
            else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    });
}
