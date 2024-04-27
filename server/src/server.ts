import app from './app';
import mongoose from 'mongoose';

async function main() {
  try {
    await mongoose.connect(
      'mongodb+srv://testProject:QAT5japTluvW0euC@cluster0.tjr1x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    );
    app.listen(2600, () => {
      console.log(`Example app listening on port 2600`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
