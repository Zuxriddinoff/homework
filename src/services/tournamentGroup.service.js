const TournamentGroup = require('../models/tournamentGroup.model');

exports.getAllGroups = () => TournamentGroup.find().populate('tournament_id');
exports.getGroupById = (id) => TournamentGroup.findById(id).populate('tournament_id');
exports.createGroup = (data) => TournamentGroup.create(data);
exports.updateGroup = (id, data) => TournamentGroup.findByIdAndUpdate(id, data, { new: true });
exports.deleteGroup = (id) => TournamentGroup.findByIdAndDelete(id);
