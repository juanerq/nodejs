"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateUser = exports.validateCreateUser = exports.validateGetUser = void 0;
const express_validator_1 = require("express-validator");
const validate_files_1 = __importDefault(require("../middlewares/validate-files"));
const db_validators_1 = require("../middlewares/db-validators");
exports.validateGetUser = [
    (0, express_validator_1.check)('from', 'Query from is not a number').optional().isNumeric(),
    (0, express_validator_1.check)('limit', 'Query limit is not a number').optional().isNumeric(),
    validate_files_1.default
];
exports.validateCreateUser = [
    (0, express_validator_1.check)('name', 'Name is required').not().isEmpty(),
    (0, express_validator_1.check)('email', 'This email is invalid').isEmail(),
    (0, express_validator_1.check)('email').custom(db_validators_1.userExists),
    validate_files_1.default
];
exports.validateUpdateUser = [
    (0, express_validator_1.check)('name', 'Name is required').optional().not().isEmpty(),
    (0, express_validator_1.check)('email', 'This email is invalid').optional().isEmail(),
    validate_files_1.default
];
//# sourceMappingURL=users.js.map