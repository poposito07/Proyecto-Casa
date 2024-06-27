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
exports.findUserByUsername = findUserByUsername;
exports.findUserByEmail = findUserByEmail;
exports.findUserById = findUserById;
exports.registerUser = registerUser;
const database_1 = __importDefault(require("../database/database"));
function findUserByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const [rows] = yield database_1.default.query('SELECT * FROM users WHERE username = ?', [username]);
        const users = rows;
        return users.length > 0 ? users[0] : null;
    });
}
function findUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const [rows] = yield database_1.default.query('SELECT * FROM users WHERE email = ?', [email]);
        const users = rows;
        return users.length > 0 ? users[0] : null;
    });
}
function findUserById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const [rows] = yield database_1.default.query('SELECT * FROM users WHERE id = ?', [userId]);
        const users = rows;
        return users.length > 0 ? users[0] : null;
    });
}
function registerUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.default.query('INSERT INTO users (username, password, email, pin) VALUES (?, ?, ?, ?)', [user.username, user.password, user.email, user.pin]);
    });
}
