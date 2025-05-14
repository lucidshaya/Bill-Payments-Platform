# React + Vite

This project is a React application built with Vite. Below is the directory structure and a brief description of each folder and file.

## Project Structure

```
frontend/
├── public/
│   ├── index.html              # Main HTML file
│   └── favicon.ico             # App icon
├── src/
│   ├── assets/                 # Static assets (images, etc.)
│   ├── components/             # Reusable UI components
│   │   ├── Chatbot.js          # Chatbot component for error handling
│   │   ├── Navbar.js           # Navigation bar
│   │   └── PaymentForm.js      # Form for inputting phone/meter number
│   ├── pages/                  # Page components
│   │   ├── HomePage.js         # Home page with list of options
│   │   ├── LoginPage.js        # Login page
│   │   ├── SignupPage.js       # Signup page
│   │   ├── InputPage.js        # Page for inputting phone/meter number
│   │   ├── PaymentSuccess.js   # Payment success page
│   │   └── PaymentFailed.js    # Payment failed page
│   ├── services/               # API service functions
│   │   ├── api.js              # API call functions (e.g., axios)
│   │   └── paystack.js         # PayStack integration logic
│   ├── App.js                  # Main app component with routing
│   ├── index.js                # Entry point for React
│   └── styles/                 # CSS files
│       ├── App.css             # Global styles
│       └── Chatbot.css         # Chatbot-specific styles
├── .env                        # Environment variables
├── .gitignore                  # Git ignore file
├── package.json                # Dependencies and scripts
└── README.md                   # Project documentation
```

## Key Features

- **React + Vite**: Fast and modern development setup.
- **Reusable Components**: Modular and reusable UI components.
- **API Integration**: Includes PayStack integration for payment processing.
- **Routing**: React Router for navigation between pages.
- **Styling**: Organized CSS files for global and component-specific styles.

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Create a `.env` file for environment variables.
4. dependencies `npm install react-router-dom axios react-chatbot-kit`
4. Run the development server with `npm run dev`.

## License

This project is licensed under the MIT License.