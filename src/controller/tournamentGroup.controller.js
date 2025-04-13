const service = require('../services/tournamentGroup.service');

exports.getAll = async (req, res) => {
  const groups = await service.getAllGroups();
  res.json(groups);
};

exports.getById = async (req, res) => {
  const group = await service.getGroupById(req.params.id);
  res.json(group);
};

exports.create = async (req, res) => {
  const newGroup = await service.createGroup(req.body);
  res.status(201).json(newGroup);
};

exports.update = async (req, res) => {
  const updatedGroup = await service.updateGroup(req.params.id, req.body);
  res.json(updatedGroup);
};

exports.remove = async (req, res) => {
  await service.deleteGroup(req.params.id);
  res.status(204).send();
};
