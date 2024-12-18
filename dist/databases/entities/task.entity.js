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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tasks = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let Tasks = class Tasks {
};
exports.Tasks = Tasks;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Tasks.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        nullable: false,
    }),
    __metadata("design:type", String)
], Tasks.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        nullable: false,
    }),
    __metadata("design:type", String)
], Tasks.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['pendiente', 'en progreso', 'completeda'],
        default: 'pendiente',
    }),
    __metadata("design:type", String)
], Tasks.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['low', 'medium', 'high'],
        default: 'low',
    }),
    __metadata("design:type", String)
], Tasks.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp with time zone',
        nullable: true,
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Tasks.prototype, "dueDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Tasks.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Tasks.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.tasks, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", user_entity_1.User)
], Tasks.prototype, "user", void 0);
exports.Tasks = Tasks = __decorate([
    (0, typeorm_1.Entity)()
], Tasks);
//# sourceMappingURL=task.entity.js.map