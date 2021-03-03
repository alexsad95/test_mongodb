import initDB from './db/db';
import {
  readAndSave,
  makeAggregation,
  clearCollections,
} from './logic';

(async () => {
  try {
    initDB();
    await clearCollections();
    await readAndSave();
    await makeAggregation();
  } catch (err) {
    console.error(`Error in main() --> ${err}`);
  }
})();