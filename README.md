# ELEMENTOR Test Project

![Node.js CI](https://github.com/drizzef/elementor/workflows/Node.js%20CI/badge.svg?branch=master)

## Installation

It is so easy you just need to run in the root folder of the project:
`docker-compose up`

- **NOTE**: Run migrate on the first time. After running the first time run the following command: `docker-compose exec api yarn installation`

It will install and run MySQL 5.7 & Adminer & API
You can test the App from the following url: http://localhost:3000

# Routes

## /auth - Authenticate JWT token.

## /logout - Logout user from the system

## /login - Login user to the system and return the JWT token

## /register - Register user to the system

## /users - Get all authenticated users

## /users/:id - Get single user

## TODO

- JWT: Refresh tokens to handle logouts more precisely
- Login should be transactional
- Error middleware
- Add Redis/Memcached
- Add Helmet
- Change authenticated users route
- Change response of the register route.
