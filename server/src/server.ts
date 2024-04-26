import app from './app';

async function main() {
  try {
    // await myDatabase.connect (config.database_url as string)
    app.listen(2600, () => {
      console.log(`Example app listening on port 2600`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
