import path from 'path';
import dotenv from 'dotenv/config';

// join cwd and .env file
// const envPath = path.join(process.cwd(), '.env');
// dotenv.config({ path: envPath });

export default {
  port: process.env.PORT,
  app_id: process.env.APP_ID,
  db_url: process.env.DB_URL,
};
