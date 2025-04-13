const service = require('../services/matchFixture.service');

exports.getAll = async (req, res) => {
  const matches = await service.getAllMatches();
  res.json(matches);
};

exports.getById = async (req, res) => {
  const match = await service.getMatchById(req.params.id);
  res.json(match);
};

exports.create = async (req, res) => {
  const newMatch = await service.createMatch(req.body);    
  res.status(201).json(newMatch);
};

exports.update = async (req, res) => {
  const updatedMatch = await service.updateMatch(req.params.id, req.body);
  res.json(updatedMatch);
};

exports.remove = async (req, res) => {
  await service.deleteMatch(req.params.id);
  res.status(204).send();
};
