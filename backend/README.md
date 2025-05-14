# Backend File Structure

This document outlines the file structure of the backend for the Bill Payment Platform project. It provides an overview of the key files and directories, their purposes, and instructions for setting up and running the application.

## File Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── billOptionsController.js
│   │   └── paymentController.js
│   ├── models/
│   │   ├── userModel.js
│   │   ├── billOptionModel.js
│   │   └── transactionModel.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── billOptionsRoutes.js
│   │   └── paymentRoutes.js
│   ├── app.js
│   └── server.js
├── .env
├── package.json
└── README.md
```

## Description of Key Files and Directories

- **`src/`**: Contains the main source code for the backend.
    - **`config/`**: Configuration files, such as database connection settings.
        - `database.js`: Handles database configuration and connection.
    - **`controllers/`**: Contains logic for handling requests and responses.
        - `authController.js`: Manages user authentication.
        - `billOptionsController.js`: Handles bill options-related operations.
        - `paymentController.js`: Manages payment processing.
    - **`models/`**: Defines the data models for the application.
        - `userModel.js`: Schema for user data.
        - `billOptionModel.js`: Schema for bill options.
        - `transactionModel.js`: Schema for transactions.
    - **`routes/`**: Defines the API endpoints.
        - `authRoutes.js`: Routes for authentication-related operations.
        - `billOptionsRoutes.js`: Routes for bill options-related operations.
        - `paymentRoutes.js`: Routes for payment-related operations.
    - `app.js`: Initializes the application and middleware.
    - `server.js`: Starts the server and listens for incoming requests.

- **`.env`**: Environment variables for sensitive configuration.
- **`package.json`**: Contains project metadata and dependencies.
- **`README.md`**: Documentation for the backend.

## Setup Instructions

1. Clone the repository to your local machine:
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the following environment variables:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=bill_payment_db
   DB_USER=postgres
   DB_PASSWORD=your_password
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Dependencies

The project uses the following dependencies:
- `express`: Web framework for Node.js.
- `pg`: PostgreSQL client for Node.js.
- `sequelize`: ORM for database management.
- `paystack`: Paystack API integration.
- `dotenv`: Loads environment variables from a `.env` file.
- `jsonwebtoken`: Handles JSON Web Tokens for authentication.
- `cors`: Enables Cross-Origin Resource Sharing.

Development dependencies:
- `nodemon`: Automatically restarts the server during development.

Install all dependencies with:
```bash
npm install express pg sequelize paystack dotenv jsonwebtoken cors
npm install -D nodemon
```

## Usage

Refer to the respective files and directories for detailed implementation. Ensure to configure the `.env` file with the required environment variables before running the application. Use the provided routes to interact with the backend API.

## Database Configuration

The backend uses PostgreSQL as the database. Use the following template for configuring your `.env` file:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bill_payment_db
DB_USER=postgres
DB_PASSWORD=your_password
```

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push the branch.
4. Submit a pull request for review.

## License

This project is licensed under the [MIT License](LICENSE).
