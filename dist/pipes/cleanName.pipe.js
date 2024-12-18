"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CleanDataPipe = void 0;
const common_1 = require("@nestjs/common");
let CleanDataPipe = class CleanDataPipe {
    cleanField(field) {
        return field
            ? field
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^\w\s]/g, '')
                .toLowerCase()
            : field;
    }
    transform(value) {
        value.name = this.cleanField(value.name);
        value.address = this.cleanField(value.address);
        value.city = this.cleanField(value.city);
        value.country = this.cleanField(value.country);
        return value;
    }
};
exports.CleanDataPipe = CleanDataPipe;
exports.CleanDataPipe = CleanDataPipe = __decorate([
    (0, common_1.Injectable)()
], CleanDataPipe);
//# sourceMappingURL=cleanName.pipe.js.map