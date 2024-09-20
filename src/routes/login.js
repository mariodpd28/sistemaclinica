const express = require('express');
const logincontroller = require('../controllers/logincontroller');

const router = express.Router();

router.get('/login', logincontroller.login);
router.get('/register', logincontroller.register);
router.get('/modulos', logincontroller.modulos);
router.post('/register', logincontroller.storeUser);
router.post('/login', logincontroller.auth);

module.exports = router;
