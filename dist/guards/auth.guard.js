"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
let AuthGuard = class AuthGuard {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];
        if (!token) {
            console.warn('AuthGuard: No authorization token provided');
            throw new common_1.UnauthorizedException('Authorization token missing');
        }
        try {
            const secret = process.env.JWT_SECRET;
            const userPayload = this.jwtService.verify(token, {
                secret: secret,
            });
            userPayload.exp = new Date(userPayload.exp * 1000);
            userPayload.iat = new Date(userPayload.iat * 1000);
            console.log('Decoded JWT in AuthGuard:', userPayload);
            request.user = userPayload;
            return true;
        }
        catch (error) {
            if (error instanceof jwt_1.TokenExpiredError) {
                console.warn(`User's session has expired`);
                throw new common_1.UnauthorizedException(`Your session has expired. Please log in again.`);
            }
            console.error('JWT Verification Error:', error);
            throw new common_1.UnauthorizedException('Invalid token');
        }
        return;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map