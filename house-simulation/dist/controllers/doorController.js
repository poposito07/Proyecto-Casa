"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.openDoor = openDoor;
exports.closeDoor = closeDoor;
exports.getDoorState = getDoorState;
exports.getDoorLog = getDoorLog;
const doorService = __importStar(require("../services/doorService"));
function openDoor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield doorService.openDoor();
            res.json({ message: 'Door opened successfully' });
        }
        catch (error) {
            console.error('Error opening door:', error);
            res.status(500).json({ message: 'Failed to open door' });
        }
    });
}
function closeDoor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield doorService.closeDoor();
            res.json({ message: 'Door closed successfully' });
        }
        catch (error) {
            console.error('Error closing door:', error);
            res.status(500).json({ message: 'Failed to close door' });
        }
    });
}
function getDoorState(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const state = yield doorService.getDoorState();
            res.json({ state });
        }
        catch (error) {
            console.error('Error getting door state:', error);
            res.status(500).json({ message: 'Failed to get door state' });
        }
    });
}
function getDoorLog(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const log = yield doorService.getDoorLog();
            res.json(log);
        }
        catch (error) {
            console.error('Error getting door log:', error);
            res.status(500).json({ message: 'Failed to get door log' });
        }
    });
}
