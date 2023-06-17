# Test Backend Developer

## Requirement
- Database Postgre SQL

## Installation

Install project with yarn

```bash
  cd $PROJECT_DIR
  npm install
```

## Setup ENV

Copy file .env.example and rename it to .env

## Setup DB


- Run migration to setup tables (directory: database/migrations)

```bash
  npm run knex:migrate:latest
```

- Run migration to setup data (directory: database/seeds)

```bash
  npm run knex:seed:run
```

## Run project
- Run for 

```bash
   node src/server.js
```

## Boilerplate
- This project is using MVC design pattern, to create new module files and folder automatically, run command bellow

```bash
  node boilerplate.js make:module {{MODULE_NAME}}
```

- example:

```bash
  node boilerplate.js make:module User
  node boilerplate.js make:module UserProfile
```
    
