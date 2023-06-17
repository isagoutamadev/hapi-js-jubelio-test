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

## Users Credentials
```bash
  [
    {
      username: 'admin001',
      password: "admin123"
    },
    {
      username: 'customer001',
      password: "customer001"
    },
    {
      username: 'customer002',
      password: "customer002"
    }
  ]
```

## FEATURES

```bash
  POST /login [No Auth]

  GET /products [All User]
  GET /products/:id [All User]
  POST /products [Admin]
  PUT /products/:id [Admin]
  DELETE /products/:id [Admin]

  GET /cart/products [Customer] (Show All Products in Cart)
  POST /cart/products [Customer] (Add Product to Cart)
  PUT /cart/products/:product_id [Customer] (Update Product stock in Cart)
  DELETE /cart/products/:product_id [Customer] (Delete Product in Cart)
  POST /cart/checkout [Customer] (Checkout Cart to Order)

  GET /orders [All User] (Show all Order if admin else filter by user_id in jwt token)
  GET /orders/:id [All User] (Detail Order)
  PUT /orders/:id/confirm [Admin] (Update Order status 'confirmed')
  PUT /orders/:id/otw [Admin] (Update Order status 'on the way')
  PUT /orders/:id/success [Customer] (Update Order status 'success')
  DELETE /orders/:id [Admin] (Delete Order)
```