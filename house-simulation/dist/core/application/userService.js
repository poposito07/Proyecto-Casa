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
class UserService {
    constructor(userRepository, pinAttemptRepository) {
        this.userRepository = userRepository;
        this.pinAttemptRepository = pinAttemptRepository;
    }
    registerUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.createUser(user);
        });
    }
    findUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.findUserByUsername(username);
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.findUserByEmail(email);
        });
    }
    validateUserPin(userId, pin) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findUserById(userId);
            if (!user)
                return false;
            const isValid = user.pin === pin;
            const attempt = {
                userId,
                timestamp: new Date(),
                success: isValid
            };
            yield this.pinAttemptRepository.logPinAttempt(attempt);
            return isValid;
        });
    }
    getUserPinAttempts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.pinAttemptRepository.getPinAttempts(userId);
        });
    }
}
exports.default = UserService;
