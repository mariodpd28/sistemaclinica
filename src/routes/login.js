const express = require('express');
const logincontroller = require('../controllers/logincontroller');

const router = express.Router();

router.get('/login', logincontroller.login);
router.get('/register', logincontroller.register);
router.get('/modulos', logincontroller.modulos);
router.get('/usuarios', logincontroller.usuarios);
router.get('/registropaciente', logincontroller.registropaciente);
router.get('/modulospaciente', logincontroller.modulospaciente);
router.get('/modificarpaciente', logincontroller.modificarpaciente);
router.get('/modificarusuarios', logincontroller.modificarusuarios);
router.post('/register', logincontroller.storeUser);
router.post('/login', logincontroller.auth);
router.post('/registropaciente', logincontroller.insertpaciente);
router.post('/user/destroy', logincontroller.destroy);
module.exports = router;
