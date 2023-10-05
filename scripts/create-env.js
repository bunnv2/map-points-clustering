const fs = require('fs');
const path = require('path');

// Define the path to the .env file
const envPath = path.join(__dirname, '..', '.env');

// Define the environment variables
const envVars = {
    PORT: 3000,
    HOST: 'localhost',
};

// Generate the .env file
const envFileContent = Object.entries(envVars)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

fs.writeFileSync(envPath, envFileContent);