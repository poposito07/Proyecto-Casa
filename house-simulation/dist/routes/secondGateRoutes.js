"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const secondGateController_1 = require("../interfaces/controllers/secondGateController");
const router = (0, express_1.Router)();
router.get('/second-gate/state', secondGateController_1.getSecondGateState);
router.post('/second-gate/state', secondGateController_1.updateSecondGateState);
exports.default = router;
