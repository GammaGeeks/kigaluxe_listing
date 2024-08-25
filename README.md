# KigaluXe Backend

## Overview

KigaluXe is a real estate web application that facilitates users to rent and buy properties online. The backend is built using Node.js and Express, with Sequelize as the ORM for database interactions and PostgreSQL. The application allows users to share properties and earn commissions.

## Features

- User authentication and authorization
- Property listings management (create, read, update, delete)
- Property search and filtering
- Commission tracking for shared properties
- RESTful API endpoints

## Technologies Used

- Node.js
- Express.js
- Sequelize (ORM)
- PostgreSQL
- JSON Web Tokens (JWT) for authentication

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or later)
- npm (v6 or later)
- MySQL (or your preferred SQL database)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/kigaluxe.git
   cd kigaluxe
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure your environment variables:

```
   PORT 
   DB_HOST = 
   DB_USERNAME = 
   DB_PASSWORD = 
   DB_DIALECT =
   DB_PORT = 
   TEST_DB_NAME = 
   DEVELOP_DB_NAME = 
   PRODUCTION_DB_NAME = 
   SECRET_KEY = 
   GMAIL_USER = 
   GMAIL_PASS = 
   BUCKET_NAME = 
   BUCKET_REGION = 
   BUCKET_ACCESS_KEY = 
   BUCKET_SECRET_KEY = 
```

4. Set up the database:

   ```bash
   npx sequelize-cli db:create
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```

### Running the Application      

To start the development server, run:

```bash
npm run dev
```

The server will start on `http://localhost:3000`.

## Project Structure

```text
kigaluxe/
├── src
   
   ├── database/
      ├── config/             # Configuration files
      ├── seeders/            # Seed data for the database
      ├── models/             # Sequelize models
      ├── migrations/             # Sequelize migrations
      ├── seeders/             # Sequelize seeders
   ├── controllers/        # Controllers for handling requests
   ├── routes/             # Route definitions
   ├── middlewares/        # Custom middleware
   ├── utils/             # Utility functions
   ├── app.js              # Entry point of the application
├── .env                # Environment variables
└── package.json        # Project metadata and dependencies
```

## Scripts

- `npm run dev`: Start the development server with nodemon
- `npm start`: Start the production server
- `npm run droptables`: to drop all tables
- `npm run migrate`: Run database migrations
- `npm run seed`: Seed the database
- `npx run lint`: Linting errors detection

## API Documentation

For detailed API documentation, refer to the [API Docs](./docs/api.md).

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any changes.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
