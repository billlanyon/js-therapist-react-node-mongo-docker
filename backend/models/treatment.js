const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const treatmentSchema = new Schema({
  text: String
});

const TreatmentModel = mongoose.model('Treatment', treatmentSchema);

module.exports = TreatmentModel;