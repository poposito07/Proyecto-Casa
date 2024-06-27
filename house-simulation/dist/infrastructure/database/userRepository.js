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
exports.UserRepository = void 0;
class UserRepository {
    constructor(pool) {
        this.pool = pool;
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO users (username, password, email, pin, role) VALUES (?, ?, ?, ?, ?)';
            const { username, password, email, pin, role } = user;
            yield this.pool.query(query, [username, password, email, pin, role]);
        });
    }
    findUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM users WHERE username = ?';
            const [rows] = yield this.pool.query(query, [username]);
            return rows.length ? rows[0] : null;
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM users WHERE email = ?';
            const [rows] = yield this.pool.query(query, [email]);
            return rows.length ? rows[0] : null;
        });
    }
    findUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM users WHERE id = ?';
            const [rows] = yield this.pool.query(query, [userId]);
            return rows.length ? rows[0] : null;
        });
    }
}
exports.UserRepository = UserRepository;
