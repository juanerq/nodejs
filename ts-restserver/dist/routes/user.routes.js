"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const users_2 = require("../validators/users");
const router = (0, express_1.Router)();
router.route('/')
    .get(users_2.validateGetUser, users_1.getUsers)
    .post(users_2.validateCreateUser, users_1.createUser);
router.route('/:id')
    .get(users_1.getUser)
    .put(users_2.validateUpdateUser, users_1.updateUser)
    .delete();
exports.default = router;
//# sourceMappingURL=user.routes.js.map