const Team = require('../models/team.model');

exports.getAllTeams = () => Team.find().populate('club_id group_id');
exports.getTeamById = (id) => Team.findById(id).populate('club_id group_id');
exports.createTeam = (data) => Team.create(data);
exports.updateTeam = (id, data) => Team.findByIdAndUpdate(id, data, { new: true });
exports.deleteTeam = (id) => Team.findByIdAndDelete(id);
