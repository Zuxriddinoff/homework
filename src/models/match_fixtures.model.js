const mongoose = require('mongoose');

const matchFixtureSchema = new mongoose.Schema({
  match_date: { type: Date, required: true },
  venue: { type: String, required: true },
  home_team_id: { type: mongoose.Schema.Types.ObjectId, ref: 'FootballClub', required: true },
  away_team_id: { type: mongoose.Schema.Types.ObjectId, ref: 'FootballClub', required: true },
  home_score: { type: Number, required: true },
  away_score: { type: Number, required: true },
  tournament_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tournament', required: true },
  match_status: { type: String, required: true }
});

module.exports = mongoose.model('MatchFixture', matchFixtureSchema);
