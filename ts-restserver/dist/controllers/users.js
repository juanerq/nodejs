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
exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { from = 0, limit = 5 } = req.query;
    const query = {
        offset: +from,
        limit: +limit,
        where: { status: true }
    };
    const users = yield user_1.default.findAndCountAll(query);
    res.json(users);
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_1.default.findByPk(id);
    if (!user) {
        res.status(404).json('');
        return;
    }
    res.json(user);
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    try {
        const user = yield user_1.default.create({
            name, email
        });
        yield user.save();
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error creating user'
        });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            res.status(400).json(`There is no user with this id ${id}`);
            return;
        }
        yield user.update({
            name, email
        });
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error update user'
        });
    }
});
exports.updateUser = updateUser;
//# sourceMappingURL=users.js.map