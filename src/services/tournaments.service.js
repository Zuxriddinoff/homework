const Tournament = require('../models/tournament.model');

exports.getAllTournaments = () => Tournament.find();
exports.getTournamentById = (id) => Tournament.findById(id);
exports.createTournament = (data) => Tournament.create(data);
exports.updateTournament = (id, data) => Tournament.findByIdAndUpdate(id, data, { new: true });
exports.deleteTournament = (id) => Tournament.findByIdAndDelete(id);
