"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const doorRoutes_1 = __importDefault(require("./routes/doorRoutes"));
const secondGateRoutes_1 = __importDefault(require("./routes/secondGateRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use('/users', userRoutes_1.default);
app.use('/doors', doorRoutes_1.default);
app.use(secondGateRoutes_1.default);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
