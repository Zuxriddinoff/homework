const mongoose = require('mongoose');

const tournamentGroupSchema = new mongoose.Schema({
  group_name: { type: String, required: true },
  tournament_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tournament', required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TournamentGroup', tournamentGroupSchema);
