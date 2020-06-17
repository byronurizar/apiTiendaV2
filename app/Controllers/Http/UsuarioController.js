'use strict'
const User = use('App/Models/User');
const Persona = use('App/Models/Persona');
const Database = use('Database');
class UsuarioController {
    async login({ request, auth, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        const { email, password } = request.all();
        try {
            const token = await auth.attempt(email, password);
            codigo = 0;
            data = token;
        } catch (err) {
            codigoHttp = 500;
            codigo = -1;
            error = "Usuario y contraseña incorrectos, por favor intente nuevamente";
            respuesta = 'Ocurrió un error al realizar la acción solicitada';
            data = null;
        }

        // return token;

        return response.status(codigoHttp).json({
            codigo,
            error,
            respuesta,
            data
        });

    }

    async store({ request }) { //puede ser cualquier nombre
        const { email, password } = request.all(); //de todo lo que recibe debe buscar lo primero

        const user = await User.create({
            username: email,
            email,
            password
        });

        // return this.login(...arguments);
        return user;

    };

    async registrarUsuario({ request, response, auth }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        try {
            let existeCorreo = false;
            let idPersona = 0;
            const { primerNombre, segundoNombre, otrosNombres, primerApellido, segundoApellido, otrosApellidos, fechaNacimiento, idGenero, correo, idMunicipio, idEstado, contrasenia } = request.all();
            const infoPersona = await Database
                .table('users').where('username', correo);
            Database.close();
            await infoPersona.forEach(fila => {
                existeCorreo = true;
                codigo = -1;
                error = "El correo ya existe por favor verifique o puede iniciar sesión con sus credenciales";
            });
            if (!existeCorreo) {

                const persona = await Persona.create({
                    primerNombre,
                    segundoNombre,
                    otrosNombres,
                    primerApellido,
                    segundoApellido,
                    otrosApellidos,
                    fechaNacimiento,
                    idGenero,
                    correo,
                    idMunicipio,
                    idEstado
                });

                idPersona = persona.$attributes.id;

                const usuario = await User.create({
                    username: correo,
                    email: correo,
                    password: contrasenia,
                    idPersona
                });
                if (usuario.$attributes.id) {
                    respuesta = "Usuario creado exitosamente";
                    const token = await auth.attempt(correo, contrasenia);
                    data = token;
                } else {
                    codigo = -1;
                    respuesta = 'Ocurrió un error al intentar crear el usuario';
                }
            }
        } catch (err) {
            codigoHttp = 500;
            codigo = -1;
            error = err.message;
            respuesta = 'Ocurrió un error al realizar la acción solicitada';
            data = null;
            console.log(err);
        }
        return response.status(codigoHttp).json({
            codigo,
            error,
            respuesta,
            data
        });
    };

    async registro({ request, response, auth }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;
        let dataSalida = {};
        let existeCorreo = false;

        try {
            let uidActual = "";
            const { email, password, name, proveedor, uid, urlfoto } = request.all();

            const infoPersona = await Database
                .table('users').where('username', email);
            Database.close();

            await infoPersona.forEach(fila => {
                existeCorreo = true;
                uidActual = fila.uid;
            });

            if (proveedor === "Google") {
                if (existeCorreo) {
                    let token = await auth.attempt(email, uidActual);
                    dataSalida.token = token;
                    dataSalida.usuario = infoPersona[0];
                } else {
                    const usuarioGoogle = await User.create({
                        username: email,
                        email,
                        password: uid,
                        name,
                        proveedor,
                        uid,
                        urlfoto
                    });

                    if (usuarioGoogle.$attributes.id) {
                        respuesta = "Usuario creado exitosamente";
                        let token = await auth.attempt(email, uid);
                        dataSalida.token = token;
                        dataSalida.usuario = usuarioGoogle.$originalAttributes;
                    } else {
                        codigo = -1;
                        respuesta = 'Ocurrió un error al intentar crear el usuario';
                    }
                }
            } else {
                if (!existeCorreo) {
                    const usuario = await User.create({
                        username: email,
                        email,
                        password,
                        name,
                        proveedor,
                        uid,
                        urlfoto
                    });

                    dataSalida.usuario = usuario;
                    if (usuario.$attributes.id) {
                        respuesta = "Usuario creado exitosamente";
                        let token = await auth.attempt(email, password);
                        dataSalida.token = token;
                        dataSalida.usuario = usuario;
                    } else {
                        codigo = -1;
                        respuesta = 'Ocurrió un error al intentar crear el usuario';
                    }
                } else {
                    codigo = -1;
                    error = "El correo ya existe por favor verifique o puede iniciar sesión con sus credenciales";
                }
            }
            data = dataSalida;
        } catch (err) {
            codigoHttp = 500;
            codigo = -1;
            error = err.message;
            respuesta = 'Ocurrió un error al realizar la acción solicitada';
            data = null;
            console.log(err);
        }
        return response.status(codigoHttp).json({
            codigo,
            error,
            respuesta,
            data
        });
    }
}

module.exports = UsuarioController
