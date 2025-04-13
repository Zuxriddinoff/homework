const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  position: { type: String, required: true },
  team_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  jersey_number: { type: Number, required: true }
});

module.exports = mongoose.model('Player', playerSchema);
