"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const Posts_1 = require("./entities/Posts");
const path_1 = __importDefault(require("path"));
exports.default = {
    entities: [Posts_1.Post],
    dbName: 'lireddit',
    password: '1234',
    type: 'postgresql',
    debug: !constants_1.__prod__,
    migrations: {
        path: path_1.default.join(__dirname, './migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
};
//# sourceMappingURL=mikro-orm.config.js.map