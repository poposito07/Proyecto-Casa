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
exports.PinAttemptRepository = void 0;
class PinAttemptRepository {
    constructor(pool) {
        this.pool = pool;
    }
    logPinAttempt(attempt) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO pin_attempts (userId, timestamp, success) VALUES (?, ?, ?)';
            const { userId, timestamp, success } = attempt;
            yield this.pool.query(query, [userId, timestamp, success]);
        });
    }
    getPinAttempts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM pin_attempts WHERE userId = ?';
            const [rows] = yield this.pool.query(query, [userId]);
            return rows;
        });
    }
}
exports.PinAttemptRepository = PinAttemptRepository;
