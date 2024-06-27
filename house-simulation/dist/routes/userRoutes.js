"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../interfaces/controllers/userController");
const router = (0, express_1.Router)();
router.post('/register', userController_1.registerUser);
router.post('/validate-pin', userController_1.validatePin);
router.get('/pin-attempts/:userId', userController_1.getPinAttempts);
exports.default = router;
