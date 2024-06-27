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
exports.getDoorState = getDoorState;
exports.setDoorState = setDoorState;
exports.getDoorLog = getDoorLog;
const database_1 = __importDefault(require("../database/database"));
function getDoorState() {
    return __awaiter(this, void 0, void 0, function* () {
        const [rows] = yield database_1.default.query('SELECT state FROM door ORDER BY timestamp DESC LIMIT 1');
        const result = rows;
        return result.length ? result[0].state : 'unknown';
    });
}
function setDoorState(state) {
    return __awaiter(this, void 0, void 0, function* () {
        const timestamp = new Date();
        yield database_1.default.query('INSERT INTO door (state, timestamp) VALUES (?, ?)', [state, timestamp]);
    });
}
function getDoorLog() {
    return __awaiter(this, void 0, void 0, function* () {
        const [rows] = yield database_1.default.query('SELECT * FROM door ORDER BY timestamp DESC');
        return rows;
    });
}
