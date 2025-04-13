const Player = require('../models/player.model');

exports.getAllPlayers = () => Player.find().populate('team_id');
exports.getPlayerById = (id) => Player.findById(id).populate('team_id');
exports.createPlayer = (data) => Player.create(data);
exports.updatePlayer = (id, data) => Player.findByIdAndUpdate(id, data, { new: true });
exports.deletePlayer = (id) => Player.findByIdAndDelete(id);
