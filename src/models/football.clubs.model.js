const mongoose = require('mongoose');

const footballClubSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  founded_year: { type: Number, required: true }
});

module.exports = mongoose.model('FootballClub', footballClubSchema);
