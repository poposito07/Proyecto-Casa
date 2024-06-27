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
exports.logPinAttempt = logPinAttempt;
exports.getPinAttempts = getPinAttempts;
// pinAttempt.ts
const database_1 = __importDefault(require("../../infrastructure/database/database"));
function logPinAttempt(userId, success) {
    return __awaiter(this, void 0, void 0, function* () {
        const timestamp = new Date();
        yield database_1.default.query('INSERT INTO pin_attempts (userId, success, timestamp) VALUES (?, ?, ?)', [userId, success, timestamp]);
    });
}
function getPinAttempts(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const [rows] = yield database_1.default.query('SELECT * FROM pin_attempts WHERE userId = ? ORDER BY timestamp DESC', [userId]);
        return rows;
    });
}
