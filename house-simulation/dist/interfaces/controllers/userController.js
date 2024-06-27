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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.getPinAttempts = getPinAttempts;
exports.validatePin = validatePin;
const resend_1 = require("resend"); // Importa Resend
const userService_1 = __importDefault(require("../../core/application/userService"));
const database_1 = __importDefault(require("../../infrastructure/database/database"));
const pinAttemptRepository_1 = require("../../infrastructure/database/pinAttemptRepository");
const userRepository_1 = require("../../infrastructure/database/userRepository");
const userRepository = new userRepository_1.UserRepository(database_1.default);
const pinAttemptRepository = new pinAttemptRepository_1.PinAttemptRepository(database_1.default);
const userService = new userService_1.default(userRepository, pinAttemptRepository);
const resend = new resend_1.Resend('re_F9TjLm1Y_5rtAKKBviECKbbSX5muF867B');
function registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password, email, pin, role } = req.body;
        const existingUser = yield userService.findUserByUsername(username);
        if (existingUser) {
            res.status(400).json({ message: 'Username already exists' });
            return;
        }
        const existingEmail = yield userService.findUserByEmail(email);
        if (existingEmail) {
            res.status(400).json({ message: 'Email already in use' });
            return;
        }
        const newUser = {
            username,
            password,
            email,
            pin,
            role
        };
        try {
            yield userService.registerUser(newUser);
            yield resend.emails.send({
                from: 'onboarding@resend.dev',
                to: 'a20624646@gmail.com',
                subject: 'Bienvenido a la aplicación',
                html: `<p>Hola ${username},</p><p>Gracias por registrarte. ¡Bienvenido a nuestra aplicación!</p>`,
            });
            res.json({ message: 'User registered successfully and email sent' });
        }
        catch (error) {
            console.error('Error registering user or sending email:', error);
            res.status(500).json({ message: 'Failed to register user or send email' });
        }
    });
}
function getPinAttempts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.params;
        try {
            const attempts = yield userService.getUserPinAttempts(Number(userId));
            res.json(attempts);
        }
        catch (error) {
            console.error('Error fetching pin attempts:', error);
            res.status(500).json({ message: 'Failed to fetch pin attempts' });
        }
    });
}
function validatePin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId, pin } = req.body;
        try {
            const isValid = yield userService.validateUserPin(userId, pin);
            res.json({ isValid });
        }
        catch (error) {
            console.error('Error validating pin:', error);
            res.status(500).json({ message: 'Failed to validate pin' });
        }
    });
}
