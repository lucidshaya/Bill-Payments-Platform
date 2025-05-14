# Bill Payments Platform

A full-stack bill payments platform built with the PERN stack (PostgreSQL, Express, React, Node.js). This application enables users to pay bills such as airtime, data subscriptions, electricity, and betting securely and efficiently, with a user-friendly interface and integrated customer support.

## Table of Contents
- [Project Structure](#project-structure)
- [Features](#features)
- [Backend](#backend)
    - [Setup](#backend-setup)
    - [Running](#backend-running)
- [Frontend](#frontend)
    - [Setup](#frontend-setup)
    - [Running](#frontend-running)
- [Running the Application](#running-the-application)
- [Contributing](#contributing)
- [License](#license)
- [Authors](#authors)

## Project Structure

The project is organized into two main directories:

| Directory | Description |
|-----------|-------------|
| `backend` | Contains server-side code, including API routes, database models, and payment processing logic. |
| `frontend` | Contains client-side code, including React components, routing, and UI styling. |

## Features

- **User Authentication**: Secure login and signup functionality using JSON Web Tokens (JWT).
- **Bill Payment Processing**: Supports payments for airtime, data, electricity, and betting via Paystack.
- **Chatbot Integration**: Provides customer support through a chatbot powered by `react-chatbot-kit`.
- **Responsive Design**: Built with TailwindCSS for a seamless experience across devices.
- **Modern Development Tools**: Uses Vite for fast frontend builds and Sequelize for database management.

## Backend

The backend is built with Node.js, Express, and PostgreSQL, using Sequelize as the ORM and Paystack for payment processing.

### Backend Setup

1. **Navigate to the Backend Directory**:
     ```bash
     cd backend
     ```

2. **Install Dependencies**:
     ```bash
     npm install
     ```

3. **Configure Environment Variables**:
     Create a `.env` file in the backend directory with the following variables:
     ```
     DATABASE_URL=postgres://user:password@localhost:5432/dbname
     PAYSTACK_SECRET_KEY=sk_test_your_paystack_secret_key
     JWT_SECRET=your_jwt_secret
     ```

4. **Initialize the Database**:
     Ensure PostgreSQL is installed and running. Create a database matching the `DATABASE_URL`. If the project uses Sequelize migrations, run:
     ```bash
     npx sequelize-cli db:migrate
     ```

### Backend Running

- **Production Mode**:
    ```bash
    npm start
    ```
    Runs the server using `node server.js`.

- **Development Mode**:
    ```bash
    npm run dev
    ```
    Uses `nodemon` for hot reloading during development.

The backend typically runs on `http://localhost:3000` (confirm the port in your `server.js`).

## Frontend

The frontend is a React application built with Vite, styled with TailwindCSS, and includes features like routing and a chatbot.

### Frontend Setup

1. **Navigate to the Frontend Directory**:
     ```bash
     cd frontend
     ```

2. **Install Dependencies**:
     ```bash
     npm install
     ```

3. **Configure Environment Variables (if needed)**:
     If the frontend requires a specific backend API URL, configure it in a `.env` file or `vite.config.js`. Example `.env`:
     ```
     VITE_API_URL=http://localhost:3000
     ```

4. **Proxy Setup (optional)**:
     To proxy API requests to the backend during development, ensure `vite.config.js` includes a proxy configuration:
     ```javascript
     server: {
         proxy: {
             '/api': 'http://localhost:3000'
         }
     }
     ```

### Frontend Running

- **Development Mode**:
    ```bash
    npm run dev
    ```
    Starts the Vite development server, typically at `http://localhost:5173`.

- **Build for Production**:
    ```bash
    npm run build
    ```

- **Preview Production**:
    ```bash
    npm run preview
    ```

## Running the Application

To run the full application:

1. **Start the Backend**:
     In one terminal:
     ```bash
     cd backend
     npm start
     ```

2. **Start the Frontend**:
     In another terminal:
     ```bash
     cd frontend
     npm run dev
     ```

Ensure both servers are running simultaneously. The frontend will connect to the backend for API requests, typically at `http://localhost:3000`.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch:
     ```bash
     git checkout -b feature/your-feature
     ```
3. Commit your changes:
     ```bash
     git commit -m 'Add your feature'
     ```
4. Push to the branch:
     ```bash
     git push origin feature/your-feature
     ```
5. Open a pull request.

For more details, see `CONTRIBUTING.md`.

## License

This project is licensed under the ISC License. See the `LICENSE.md` file for details.

## Authors

Ohine Ivori 
