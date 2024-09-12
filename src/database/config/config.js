/* eslint-disable default-param-last */
/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
/* eslint-disable require-jsdoc */
import dotenv from 'dotenv';

dotenv.config();

class GenerateCredentials {
  constructor(username = 'postgres', password = '', database, host, dialect = 'postgres', dialectOptions = undefined, logging = false) {
    this.username = username;
    this.password = password;
    this.database = database;
    this.host = host;
    this.dialect = dialect;
    this.logging = logging;
    this.dialectOptions = dialectOptions;
  }

  getCredentials() {
    return {
      username: this.username,
      password: this.password,
      database: this.database,
      host: this.host,
      dialect: this.dialect,
      logging: this.logging,
      dialectOptions: this.dialectOptions // Ensuring dialectOptions are passed
    };
  }

  setCredentials(credentials) {
    this.username = credentials.username;
    this.password = credentials.password;
    this.database = credentials.database;
    this.host = credentials.host;
    this.dialect = credentials.dialect;
    this.logging = credentials.logging;
    this.dialectOptions = credentials.dialectOptions;
  }
}

// Development DB Config
const devDB = new GenerateCredentials(
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  process.env.DEVELOP_DB_NAME,
  process.env.DB_HOST,
  'postgres',
  {
    ssl: {
      require: true, // Ensure SSL for secure connection
      rejectUnauthorized: false // Allows self-signed certificates
    }
  },
  true // Enable logging for development environment
);

// Test DB Config
const testDB = new GenerateCredentials(
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  process.env.TEST_DB_NAME,
  process.env.DB_HOST,
  'postgres',
  {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  false // Disable logging for tests
);

// Production DB Config
const prodDB = new GenerateCredentials(
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  process.env.PRODUCTION_DB_NAME,
  process.env.DB_HOST,
  'postgres',
  {
    ssl: {
      require: true,
      rejectUnauthorized: false // Avoid rejecting SSL certificates for RDS
    }
  },
  false // Disable logging in production for security
);

// Extract credentials for different environments
const development = devDB.getCredentials();
const test = testDB.getCredentials();
const production = prodDB.getCredentials();

// Log credentials for debugging purposes (only for development)
if (process.env.NODE_ENV === 'development') {
  console.log('Development DB Config:', development);
}

// Export configurations
export default {
  development,
  test,
  production
};

export {
  development,
  test,
  production
};
