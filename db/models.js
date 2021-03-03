import mongoose from 'mongoose';

const UniversitiesSchema = new mongoose.Schema({
  country: String,
  city: String,
  name: String,
  location: Object,
  students: Array,
  seconds: { type: Array, default: undefined },
});

const CountriesSchema = new mongoose.Schema({
  country: String,
  overallStudents: Number,
});

export const Universities = mongoose.model('Universities', UniversitiesSchema);
export const Countries = mongoose.model('Countries', CountriesSchema);