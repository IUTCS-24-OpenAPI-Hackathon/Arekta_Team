import app from './app';
import config from './app/config/config';

async function main() {
  try {
    // await myDatabase.connect (config.database_url as string)
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
