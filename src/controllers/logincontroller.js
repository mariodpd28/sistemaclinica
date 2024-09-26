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
                            res.redirect('modulos');
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
function modulospaciente(req, res) {
    if (req.session.loggedin) {
        res.render('modulospaciente'); // Asegúrate de que la vista modulospaciente.hbs exista
    } else {
        res.redirect('/login'); // Redirigir a login si no está autenticado
    }
}

function modificarpaciente(req, res) {
    if (req.session.loggedin) {
        res.render('modificarpaciente'); // Asegúrate de que la vista modulospaciente.hbs exista
    } else {
        res.redirect('/login'); // Redirigir a login si no está autenticado
    }
}
function modificarusuarios(req, res) {
    if (req.session.loggedin) {
        req.getConnection((err, conn)=>{
            conn.query('SELECT * FROM user',(err, user) => {
                if(err){
                    res.json(err);
                }
                res.render('modificarusuarios', {user});
            });
            });
        }else {
            res.redirect('/login'); // Redirigir a login si no está autenticado
        }

}
function usuarios(req, res) {
    if (req.session.loggedin) {
        res.render('usuarios'); // Asegúrate de que la vista modulos.hbs exista
    } else {
        res.redirect('/login'); // Redirigir a login si no está autenticado
    }
}
function registropaciente(req, res) {
    if (req.session.loggedin) {
        res.render('registropaciente'); // Asegúrate de que la vista modulos.hbs exista
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
                            res.redirect('/modulos');
                        });
                    });
                });
            }
        });
    });
}
function insertpaciente(req,res){
    const data = req.body;

    req.getConnection((err,conn) => {
    conn.query('INSERT INTO paciente SET ?',[data], (err, rows) =>{
    res.redirect('/modulospaciente');
    });
    });
}

function crudeuser(req,res){
    req.getConnection((err, conn)=>{
    conn.query('SELECT * FROM user',(err, tasks) => {
        if(err){
            res.json(err);
        }
        console.log(tasks);
    });
    });

    res.render('modificarusuarios');
}

function destroy(req, res){
const email = req.body.email;
req.getConnection((err, conn)=>{
conn.query('DELETE FROM user WHERE email = ?', [email], (err, rows)=>{
    res.redirect('/modificarusuarios');
});
});
}
module.exports = {
    login,
    register,
    storeUser,
    auth,
    modulos,
    usuarios,
    registropaciente,
    modulospaciente,
    modificarpaciente,
    modificarusuarios,
    insertpaciente,
    crudeuser,
    destroy,
}
