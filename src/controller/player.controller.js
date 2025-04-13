import service from "../services/player.service.js"

exports.getAll = async (req, res) => {
  const players = await service.getAllPlayers();
  res.json(players);
};

exports.getById = async (req, res) => {
  const player = await service.getPlayerById(req.params.id);
  res.json(player);
};

exports.create = async (req, res) => {
  const newPlayer = await service.createPlayer(req.body);
  res.status(201).json(newPlayer);
};

exports.update = async (req, res) => {
  const updatedPlayer = await service.updatePlayer(req.params.id, req.body);
  res.json(updatedPlayer);
};

exports.remove = async (req, res) => {
  await service.deletePlayer(req.params.id);
  res.status(204).send();
};
