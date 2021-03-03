import fs from 'fs';
import path from 'path';
import agg from './aggregation';
import { Universities, Countries } from '../db/models';

export async function clearCollections() {
  try {
    await Universities.deleteMany();
    await Countries.deleteMany();
  } catch (err) {
    console.error('Error in clearCollections(). ', err);
  }
}

export async function readAndSave() {
  try {
    const fileNames = fs.readdirSync(
      `/${path.join(...__dirname.split(path.sep).slice(0, -1))}/files`,
      (err, files) => {
        if (err) throw err;
        return files;
      }
    );
    const promises = fileNames.map((file) => { // eslint-disable-line
      const data = fs.readFileSync(`files/${file}`, 'utf8');
      console.log(`The file "${file}" was read and write into "${file.split('.')[0].toLowerCase()}" collection.`);
      if (file.split('.')[0] === Universities.modelName) {
        return Universities.create(JSON.parse(data));
      } if (file.split('.')[0] === Countries.modelName) {
        return Countries.create(JSON.parse(data));
      }
    });
    await Promise.all(promises);
  } catch (err) {
    console.error('Error in readAndSave(). ', err);
  }
}

export async function makeAggregation() {
  try {
    await Universities.aggregate(agg,
      (err) => {
        if (err) console.error('Aggregation error. ', err);
        else console.info('Aggregation results have been written into "results" collection.');
    });
  } catch (err) {
    console.error('Error in makeAggregation(). ', err);
  }
}
