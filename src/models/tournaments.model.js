const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
  tournament_name: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  status: { type: String, required: true }
});

module.exports = mongoose.model('Tournament', tournamentSchema);
