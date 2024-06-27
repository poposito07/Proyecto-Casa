"use strict";
// infrastructure/database/secondGateRepository.ts
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
exports.SecondGateRepository = void 0;
const database_1 = __importDefault(require("./database"));
class SecondGateRepository {
    getSecondGateState() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield database_1.default.query('SELECT * FROM second_gate ORDER BY timestamp DESC LIMIT 1');
            const gateStates = rows;
            return gateStates.length > 0 ? gateStates[0] : { state: 'closed' };
        });
    }
    updateSecondGateState(state) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO second_gate (state, timestamp) VALUES (?, ?)', [state, new Date()]);
        });
    }
}
exports.SecondGateRepository = SecondGateRepository;
