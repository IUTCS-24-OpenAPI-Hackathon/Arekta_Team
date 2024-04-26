import app from './app';
import config from './app/config/config';
import mongoose from 'mongoose';

async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    app.listen(2600, () => {
      console.log(`Example app listening on port 2600`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
