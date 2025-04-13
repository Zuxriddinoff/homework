const service = require('../services/footballClub.service');

exports.getAll = async (req, res) => {
  const clubs = await service.getAllClubs();
  res.json(clubs);
};

exports.getById = async (req, res) => {
  const club = await service.getClubById(req.params.id);
  res.json(club);
};

exports.create = async (req, res) => {
  const newClub = await service.createClub(req.body);
  res.status(201).json(newClub);
};

exports.update = async (req, res) => {
  const updatedClub = await service.updateClub(req.params.id, req.body);
  res.json(updatedClub);
};

exports.remove = async (req, res) => {
  await service.deleteClub(req.params.id);
  res.status(204).send();
};
