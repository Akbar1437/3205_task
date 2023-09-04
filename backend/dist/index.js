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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const data_1 = require("./data");
const express_validator_1 = require("express-validator");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ credentials: true }));
app.post("/search", (0, express_validator_1.body)("email").isEmail(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let lastRequest = null;
    if (lastRequest) {
        clearTimeout(lastRequest);
    }
    const { email, number } = req.body;
    lastRequest = setTimeout(() => {
        const filteredUsers = data_1.usersData.filter((user) => {
            if (email && user.email !== email) {
                return false;
            }
            if (number && user.number !== number) {
                return false;
            }
            return true;
        });
        res.json(filteredUsers);
    }, 5000);
}));
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
