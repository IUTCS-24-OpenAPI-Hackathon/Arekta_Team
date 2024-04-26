import path from 'path';
import dotenv from 'dotenv';

// join cwd and .env file
const envPath = path.join(process.cwd(), '.env');
console.log(envPath);
dotenv.config({ path: envPath });

console.log(process.env);

export default {
  port: process.env.PORT,
  app_id: process.env.APP_ID,
};
