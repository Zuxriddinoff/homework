const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  team_name: { type: String, required: true },
  club_id: { type: mongoose.Schema.Types.ObjectId, ref: 'FootballClub', required: true },
  group_id: { type: mongoose.Schema.Types.ObjectId, ref: 'TournamentGroup', required: true },
  coach_name: { type: String, required: true }
});

module.exports = mongoose.model('Team', teamSchema);
