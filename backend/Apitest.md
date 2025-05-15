# Bill Payment Platform

A comprehensive full-stack bill payment platform built with the PERN stack (PostgreSQL, Express, React, Node.js) using ES modules. This platform facilitates payments for airtime, data, electricity, cable TV, and betting, similar to iRecharge. It integrates Paystack for payment processing and employs JWT-based authentication for secure user signup and login.

## Table of Contents
1. [Features](#features)
2. [Project Structure](#project-structure)
3. [Prerequisites](#prerequisites)
4. [Setup Instructions](#setup-instructions)
5. [Database Setup with pgAdmin](#database-setup-with-pgadmin)
6. [Running the Application](#running-the-application)
7. [API Testing with Postman](#api-testing-with-postman)
8. [Security Considerations](#security-considerations)
9. [Deployment](#deployment)
10. [Paystack Integration Notes](#paystack-integration-notes)
11. [Contributing](#contributing)
12. [License](#license)

---

## Features

- **User Authentication**: Secure signup and login with JWT and bcrypt.
- **Payment Services**: Supports airtime, data, electricity, cable TV, and betting payments via Paystack.
- **Database**: PostgreSQL for storing users and transactions.
- **API Endpoints**: RESTful APIs for authentication and payment processing.
- **Front-End**: Optional React interface for user interaction.
- **Modular Code**: Uses ES modules for modern JavaScript.

---

## Project Structure

```plaintext
bill-payment/
├── server/
│   ├── config/
│   │   ├── database.js        # PostgreSQL connection
│   │   └── keys.js            # API keys (Paystack, JWT)
│   ├── controller/
│   │   ├── authController.js  # Signup, login logic
│   │   ├── airtimeController.js # Airtime payments
│   │   ├── electricityController.js # Electricity payments
│   │   ├── cableTVController.js # Cable TV payments
│   │   ├── bettingController.js # Betting payments
│   │   └── transactionController.js # Transaction logging
│   ├── model/
│   │   ├── User.js            # User schema
│   │   └── Transaction.js     # Transaction schema
│   ├── route/
│   │   ├── authRoutes.js      # /signup, /login
│   │   ├── airtimeRoutes.js   # Airtime endpoints
│   │   ├── electricityRoutes.js # Electricity endpoints
│   │   ├── cableTVRoutes.js   # Cable TV endpoints
│   │   ├── bettingRoutes.js   # Betting endpoints
│   │   └── transactionRoutes.js # Transaction history
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT verification
│   ├── utils/
│   │   └── errorHandler.js    # Error handling
│   └── server.js              # Express server entry point
├── client/                    # Optional React front-end
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/          # Signup, login components
│   │   │   └── Services/      # Payment components
│   │   ├── pages/             # Home, dashboard
│   │   ├── App.js             # Main React app
│   │   └── index.js           # React entry point
│   ├── public/                # Static assets
│   └── package.json           # Front-end dependencies
├── .env                       # Environment variables
└── package.json               # Server dependencies
```

---

## Prerequisites

- **Node.js**: v16+ ([nodejs.org](https://nodejs.org))
- **PostgreSQL**: v14+ ([postgresql.org](https://www.postgresql.org))
- **pgAdmin**: v7+ ([pgadmin.org](https://www.pgadmin.org))
- **Paystack Account**: Test or live keys ([paystack.com](https://paystack.com))
- **Postman**: For API testing ([postman.com](https://www.postman.com))
- **React**: v18+ for front-end ([reactjs.org](https://reactjs.org))
- **Vendor APIs**: Access to telecom, electricity, cable TV, and betting APIs (region-specific)

---

## Setup Instructions

### Clone the Repository
```bash
git clone <repository-url>
cd bill-payment
```

### Install Server Dependencies
```bash
npm install
```

Dependencies include: `express`, `pg`, `bcrypt`, `jsonwebtoken`, `paystack-api`, `dotenv`, `cors`, `nodemon` (dev).

### Set Up Environment Variables
Create a `.env` file in the root directory:
```plaintext
DB_HOST=localhost
DB_USER=postgres
DB_PASS=your_password
DB_NAME=bill_payment
JWT_SECRET=your_jwt_secret
PAYSTACK_SECRET_KEY=sk_test_your_paystack_secret_key
```

### Install Client Dependencies (if using React front-end)
```bash
cd client
npm install
```

---

## Database Setup with pgAdmin

### Install PostgreSQL and pgAdmin
1. Download PostgreSQL from [postgresql.org](https://www.postgresql.org).
2. Set a password for the `postgres` user during installation.
3. Install pgAdmin (typically bundled with PostgreSQL).

### Create Database
1. Open pgAdmin and log in with the `postgres` user.
2. Right-click **Databases** > **Create > Database**.
3. Name the database `bill_payment` and save.

### Create Tables
#### Users Table
- **Columns**:
    - `id`: SERIAL, Primary Key
    - `username`: VARCHAR(50), Not Null
    - `email`: VARCHAR(100), Not Null, Unique
    - `password`: VARCHAR(255), Not Null
    - `created_at`: TIMESTAMP, Default CURRENT_TIMESTAMP

#### Transactions Table
- **Columns**:
    - `id`: SERIAL, Primary Key
    - `user_id`: INTEGER, Foreign Key to `users(id)`
    - `service`: VARCHAR(50), Not Null
    - `amount`: DECIMAL(10,2), Not Null
    - `status`: VARCHAR(20), Not Null
    - `reference`: VARCHAR(100), Not Null
    - `created_at`: TIMESTAMP, Default CURRENT_TIMESTAMP

Add a foreign key on `user_id` with **ON DELETE CASCADE**.

---

## Running the Application

### Start the Server
```bash
npm start
```
Or use:
```bash
npm run dev
```
Server runs on [http://localhost:5000](http://localhost:5000).

### Start the Client (if using React)
```bash
cd client
npm start
```
Runs on [http://localhost:3000](http://localhost:3000).

---

## API Testing with Postman

### Setup Postman
1. Install Postman from [postman.com](https://www.postman.com).
2. Create a collection named **Bill Payment API**.
3. Set up an environment:
     - **Variables**:
         - `base_url`: `http://localhost:5000`
         - `token`: (set after login)

### Test Endpoints
#### Signup (POST `/api/auth/signup`)
- **URL**: `{{base_url}}/api/auth/signup`
- **Headers**: `Content-Type: application/json`
- **Body**:
    ```json
    {
        "username": "johndoe",
        "email": "johndoe@example.com",
        "password": "securepassword123"
    }
    ```

#### Login (POST `/api/auth/login`)
- **URL**: `{{base_url}}/api/auth/login`
- **Headers**: `Content-Type: application/json`
- **Body**:
    ```json
    {
        "email": "johndoe@example.com",
        "password": "securepassword123"
    }
    ```

#### Airtime Purchase (POST `/api/airtime/purchase`)
- **URL**: `{{base_url}}/api/airtime/purchase`
- **Headers**:
    - `Content-Type: application/json`
    - `Authorization: Bearer {{token}}`
- **Body**:
    ```json
    {
        "phoneNumber": "08012345678",
        "amount": 1000,
        "network": "MTN"
    }
    ```

---

## Security Considerations

- **HTTPS**: Use HTTPS in production for secure communication.
- **Input Validation**: Sanitize inputs to prevent SQL injection and XSS.
- **Environment Variables**: Store secrets in `.env`.
- **Error Handling**: Centralized error handling in `utils/errorHandler.js`.
- **Transaction Logging**: Audit all payments in the `transactions` table.

---

## Deployment

### Back-End
- Deploy on platforms like Heroku, AWS, or Render.
- Use PostgreSQL add-ons or managed databases.
- Set `.env` variables in the hosting platform.

### Front-End
- Deploy on platforms like Netlify or Vercel.
- Update the API base URL to the deployed back-end.

### Paystack
- Switch to live API keys.
- Configure webhooks for transaction verification.

---

## Paystack Integration Notes

- **Webhooks**: Set up `/api/webhook/paystack` to verify transactions ([Paystack Docs](https://paystack.com/docs)).
- **Test Cards**:
    - Success: `4084084084084081`, CVV `408`, Expiry `12/24`, OTP `12345`
    - Declined: `4000000000000002`

---

## Contributing

1. Fork the repository.
2. Create a feature branch:
     ```bash
     git checkout -b feature-name
     ```
3. Commit changes:
     ```bash
     git commit -m "Add feature"
     ```
4. Push to branch:
     ```bash
     git push origin feature-name
     ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
