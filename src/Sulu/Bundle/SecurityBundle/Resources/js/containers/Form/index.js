"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissions = exports.RoleAssignments = exports.Permissions = void 0;
const Permissions_1 = __importDefault(require("./fields/Permissions"));
exports.Permissions = Permissions_1.default;
const RoleAssignments_1 = __importDefault(require("./fields/RoleAssignments"));
exports.RoleAssignments = RoleAssignments_1.default;
const RolePermissions_1 = __importDefault(require("./fields/RolePermissions"));
exports.RolePermissions = RolePermissions_1.default;
