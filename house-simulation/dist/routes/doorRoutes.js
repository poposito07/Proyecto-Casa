"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const doorController_1 = require("../interfaces/controllers/doorController");
const router = (0, express_1.Router)();
router.get('/state', doorController_1.getDoorState);
router.post('/state', doorController_1.updateDoorState);
exports.default = router;
