# Blog Backend API

A RESTful backend API for a full-stack blog application built with NestJS and PostgreSQL.

## Features

- User Authentication (JWT)
- Role-Based Authorization
- User Registration & Login
- Create, Update & Delete Posts
- Comment System
- Like Posts
- Tags
- Image Upload Support
- Pagination
- PostgreSQL Database
- TypeORM ORM
- Validation using class-validator

## Tech Stack

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- Passport JWT
- bcrypt
- class-validator

## Folder Structure

```
src/
│
├── auth/
├── users/
├── posts/
├── comments/
├── likes/
├── tags/
├── uploads/
└── main.ts
```

## Installation

Clone the repository

```bash
git clone <repository-url>
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=blog_db

JWT_SECRET=your_secret_key
```

Run the project

```bash
npm run start:dev
```

The server will start on

```
http://localhost:3000
```

## API Endpoints

### Authentication

- POST /auth/register
- POST /auth/login

### Users

- GET /users
- GET /users/:id
- PATCH /users/:id
- DELETE /users/:id

### Posts

- GET /posts
- GET /posts/:id
- POST /posts
- PATCH /posts/:id
- DELETE /posts/:id

### Comments

- GET /comments
- POST /comments
- PATCH /comments/:id
- DELETE /comments/:id

### Likes

- POST /likes/:postId
- DELETE /likes/:postId

### Tags

- GET /tags
- POST /tags

## Future Improvements

- Bookmark Posts
- Email Verification
- Password Reset
- Notifications
- Swagger Documentation

## Author

Shashank Rawat