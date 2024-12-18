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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("../../databases/entities/task.entity");
let TasksService = class TasksService {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }
    async createTask(createTaskDto) {
        const task = this.tasksRepository.create(createTaskDto);
        return this.tasksRepository.save(task);
    }
    async getAllTasks() {
        return this.tasksRepository.find();
    }
    async getTask(id) {
        const task = await this.tasksRepository.findOne({ where: { id } });
        if (!task) {
            throw new common_1.NotFoundException(`Task with ID "${id}" not found`);
        }
        return task;
    }
    async updateTask(id, updateTaskDto) {
        const task = await this.getTask(id);
        Object.assign(task, updateTaskDto);
        return this.tasksRepository.save(task);
    }
    async deleteTask(id) {
        const result = await this.tasksRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Task with ID "${id}" not found`);
        }
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Tasks)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], TasksService);
//# sourceMappingURL=tasks.service.js.map