const { response } = require("express");
const { getAll, changeUsersStatus, deleteUsers } = require("../models/user");

const getUsers = async (req, res = response) => {
  const users = await getAll();

  try {
    res.json(users);
  }
  catch (e) {
    console.error(e);
    res.status(500).send();
  }
};

const blockUsers = async (req, res = response) => {
  try {
    await changeUsersStatus(req.body.userIds, true);
    res.status(200).send();
  }
  catch (e) {
    console.error(e);
    res.status(500).send();
  }
};

const unblockUsers = async (req, res = response) => {
  try {
    await changeUsersStatus(req.body.userIds, false);
    res.status(200).send();
  }
  catch (e) {
    console.error(e);
    res.status(500).send();
  }
};

const deleteTickedUsers = async (req, res = response) => {
  try {
    await deleteUsers(req.body.userIds);
    res.status(200).send();
  }
  catch (e) {
    console.error(e);
    res.status(500).send();
  }
};

module.exports = { blockUsers, deleteTickedUsers, getUsers, unblockUsers };