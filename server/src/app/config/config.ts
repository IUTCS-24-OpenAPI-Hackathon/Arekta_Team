import path from 'path';
import dotenv from 'dotenv';

// join cwd and .env file
const envPath = path.join(process.cwd(), '.env');

// Load environment variables from the .env file
dotenv.config({ path: envPath });

// now we can access our environment variables from this file and to access those variables from anywhere in our application we have to export that variables from here

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
};
