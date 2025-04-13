const service = require('../services/tournament.service');

exports.getAll = async (req, res) => {
  const tournaments = await service.getAllTournaments();
  res.json(tournaments);
};

exports.getById = async (req, res) => {
  const tournament = await service.getTournamentById(req.params.id);
  res.json(tournament);
};

exports.create = async (req, res) => {
  const newTournament = await service.createTournament(req.body);
  res.status(201).json(newTournament);
};

exports.update = async (req, res) => {
  const updatedTournament = await service.updateTournament(req.params.id, req.body);
  res.json(updatedTournament);
};

exports.remove = async (req, res) => {
  await service.deleteTournament(req.params.id);
  res.status(204).send();
};
