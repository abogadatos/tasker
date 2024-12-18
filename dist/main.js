"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const UsersLogger_middleware_1 = require("./middlewares/UsersLogger.middleware");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const loggerMiddleware = new UsersLogger_middleware_1.LoggerMiddleware();
    app.use(loggerMiddleware.use);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map