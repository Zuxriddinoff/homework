const service = require('../services/team.service');

exports.getAll = async (req, res) => {
  const teams = await service.getAllTeams();
  res.json(teams);
};

exports.getById = async (req, res) => {
  const team = await service.getTeamById(req.params.id);
  res.json(team);
};

exports.create = async (req, res) => {
  const newTeam = await service.createTeam(req.body);
  res.status(201).json(newTeam);
};

exports.update = async (req, res) => {
  const updatedTeam = await service.updateTeam(req.params.id, req.body);
  res.json(updatedTeam);
};

exports.remove = async (req, res) => {
  await service.deleteTeam(req.params.id);
  res.status(204).send();
};
