const { Router } = require('express');
const router = Router();

const { getUsers, blockUsers, unblockUsers, deleteTickedUsers } = require('../controllers/users');
const authMiddlewere = require('../middlewares/auth');

router.get('/', [
    authMiddlewere
], getUsers);

router.post('/block', [
    authMiddlewere
], blockUsers);

router.post('/unblock', [
    authMiddlewere
], unblockUsers);

router.delete('/delete', [
    authMiddlewere
], deleteTickedUsers);

module.exports = router;