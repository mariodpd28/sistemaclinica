const bcrypt = require('bcrypt');

function login(req, res) {
    if (req.session.loggedin !== true) {
        res.render('login/index');
    } else {
        res.redirect('/');
    }
}

function auth(req, res) {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM user WHERE email = ?', [data.email], (err, userdata) => {
            if (userdata.length > 0) {
                userdata.forEach(element => {
                    bcrypt.compare(data.password, element.password, (err, isMatch) => {
                        if (!isMatch) {
                            res.render('login/index', { error: 'Contraseña es incorrecta' });
                        } else {
                            req.session.loggedin = true; // Asegúrate de que esta variable esté correctamente nombrada
                            req.session.name = element.name;

                            // Redirigir a la página modulos.hbs después de autenticar
                            res.redirect('/modulos');
                        }
                    });
                });
            } else {
                res.render('login/index', { error: 'El usuario no existe' });
            }
        });
    });
}

function register(req, res) {
    if (req.session.loggedin == true) {
        res.render('login/register');
    } else {
        res.redirect('/');
    }
}

function modulos(req, res) {
    if (req.session.loggedin) {
        res.render('modulos'); // Asegúrate de que la vista modulos.hbs exista
    } else {
        res.redirect('/login'); // Redirigir a login si no está autenticado
    }
}

function storeUser(req, res) {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM user WHERE email = ?', [data.email], (err, userdata) => {
            if (userdata.length > 0) {
                res.render('login/register', { error: 'El usuario ya existe' });
            } else {
                bcrypt.hash(data.password, 12).then(hash => {
                    data.password = hash;

                    req.getConnection((err, conn) => {
                        conn.query('INSERT INTO user SET ?', [data], (err, rows) => {
                            res.redirect('/');
                        });
                    });
                });
            }
        });
    });
}

module.exports = {
    login,
    register,
    storeUser,
    auth,
    modulos,
}
