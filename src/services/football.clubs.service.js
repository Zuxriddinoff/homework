const FootballClub = require('../models/footballClub.model');

exports.getAllClubs = () => FootballClub.find();
exports.getClubById = (id) => FootballClub.findById(id);
exports.createClub = (data) => FootballClub.create(data);
exports.updateClub = (id, data) => FootballClub.findByIdAndUpdate(id, data, { new: true });
exports.deleteClub = (id) => FootballClub.findByIdAndDelete(id);
