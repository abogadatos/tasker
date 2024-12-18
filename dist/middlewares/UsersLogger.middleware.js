"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
let LoggerMiddleware = class LoggerMiddleware {
    use(req, res, next) {
        const logStart = process.hrtime();
        res.on('finish', () => {
            const diff = process.hrtime(logStart);
            const timeInMs = diff[0] * 1e9 + diff[1] / 1e9;
            const now = new Date();
            const rightNow = now.toLocaleString();
            const rightNowToString = rightNow.toString();
            console.log(`'${req.method}' method was used on route ${req.originalUrl} at ${rightNowToString}. Response time: ${timeInMs.toFixed(3)}ms`);
        });
        next();
    }
};
exports.LoggerMiddleware = LoggerMiddleware;
exports.LoggerMiddleware = LoggerMiddleware = __decorate([
    (0, common_1.Injectable)()
], LoggerMiddleware);
//# sourceMappingURL=UsersLogger.middleware.js.map