const MatchFixture = require('../models/matchFixture.model');

exports.getAllMatches = () => MatchFixture.find().populate('home_team_id away_team_id tournament_id');
exports.getMatchById = (id) => MatchFixture.findById(id).populate('home_team_id away_team_id tournament_id');
exports.createMatch = (data) => MatchFixture.create(data);
exports.updateMatch = (id, data) => MatchFixture.findByIdAndUpdate(id, data, { new: true });
exports.deleteMatch = (id) => MatchFixture.findByIdAndDelete(id);
