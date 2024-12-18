<p align="center"> <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a> </p> <h1 align="center">Task Management API</h1> <p align="center">A simple yet robust API for managing tasks, built with <a href="http://nestjs.com/" target="_blank">NestJS</a>, TypeScript, and PostgreSQL.</p> <p align="center"> <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a> <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a> <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a> <a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a> <a href="https://twitter.com/abogadatos" target="_blank"><img src="https://img.shields.io/twitter/follow/abogadatos.svg?style=social&label=Follow" alt="Follow the developer" /></a> </p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## 🚀 Description

This Task Management API was developed by @abogadatos as part of a technical interview project. The API allows users to manage tasks efficiently while demonstrating proficiency in NestJS, TypeScript, and PostgreSQL.

### Key Features

- JWT Authentication: Secure authentication with JSON Web Tokens.
- Role-Based Access Control (RBAC): Fine-grained access to endpoints based on user roles (User, Trainer, Admin, SuperAdmin).
- Data Encryption: Passwords are securely hashed with bcrypt.
- Task Management: Create, update, delete, and retrieve tasks.
- Simple & Scalable: Built using NestJS for modern, scalable server-side applications.
- Database-Driven: Uses PostgreSQL as the database with TypeORM for managing entities.

## 🛠️ Installation

```bash
$ git clone https://github.com/abogadatos/tasker.git
$ cd tasker
$ npm install
```

## 🏃 Running the API

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 📚 API Endpoints

### Authentication

- POST /auth/login: Authenticate and obtain a JWT.
- POST /auth/register: Create a new user.

### Tasks

- GET /tasks: Retrieve all tasks (role-based access).
- POST /tasks: Create a new task (accessible to authorized roles).
- PATCH /tasks/:id: Update an existing task.
- DELETE /tasks/:id: Delete a task.

### Users

- GET /users/:id: Retrieve user details (admin-only access).

## 🧑‍💻 Roles & Permissions

The API uses role-based access to control permissions:

- User: Basic access to their own tasks.
- Associate: User with memberships can manage tasks and premium features.
- Admin: Full access to manage all users and tasks.
- SuperAdmin: All permissions, including system-level operations.

## 📦 Technology Stack

- Framework: NestJS
- Programming Language: TypeScript
- Database: PostgreSQL
- ORM: TypeORM
- Authentication: JWT & bcrypt

## 🙌 About the Developer

This API was crafted by @abogadatos, a developer with a passion for creating scalable and efficient backend systems.

## License

Nest is [MIT licensed](LICENSE).
