const usersCollection = require('../dataLayer/usersCollections.js');

async function createUser(body) {

    const user = await usersCollection.create({
        username: body.username,
        email: body.email,
        password: body.password,
        salt: body.salt,
    })
    return user;
};

async function getOneByEmail(email) {
    const user = await usersCollection.findOne({ where: {email}, rejectOnEmpty: true });
    return user;
};

async function getOneById(id) {
    const user = await usersCollection.findOne({ where: { id }, rejectOnEmpty: true });
    return user;
};

async function getAll() {
    const users = await usersCollection.findAll({ attributes: { exclude: ['password', 'salt'] } });

    return users;
};

async function updateLastLoginTime(email) {
    const currenLoginTime = new Date();
    await usersCollection.update({ last_login_time: currenLoginTime }, { where: { email }})
};

async function changeUsersStatus(userIds, blocked) {
    await usersCollection.update({ is_blocked: blocked }, { where: { id: userIds } })
    return;
};

async function deleteUsers(userIds) {
    await usersCollection.destroy({ where: { id: userIds } })
    return;
};

module.exports = { createUser, changeUsersStatus, deleteUsers, getAll, getOneByEmail, getOneById, updateLastLoginTime };