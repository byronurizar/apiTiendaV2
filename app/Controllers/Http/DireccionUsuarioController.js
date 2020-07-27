'use strict'
const DireccionUsuario = use('App/Models/DireccionUsuario');
const Database = use('Database');
class DireccionUsuarioController {
    async listar({ auth, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        const usuario = await auth.getUser();
        try {
            data = await DireccionUsuario.all();
        } catch (err) {
            codigoHttp = 500;
            codigo = -1;
            error = err.message;
            respuesta = 'Ocurrió un error al realizar la acción solicitada';
            data = null;
        }

        return response.status(codigoHttp).json({
            codigo,
            error,
            respuesta,
            data
        });
    }
    async direccionesUsuario({ auth, params, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        const usuario = await auth.getUser();
        const { id } = usuario;
        try {
            data = await Database
                .table('vistaDireccionesUsuario')
                .where({ user_id: id, idEstado: 1 });

        } catch (err) {
            codigoHttp = 500;
            codigo = -1;
            error = err.message;
            respuesta = 'Ocurrió un error al realizar la acción solicitada';
            data = null;
        }

        return response.status(codigoHttp).json({
            codigo,
            error,
            respuesta,
            data
        });
    }
    async registrar({ auth, request, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        const direccionUsuario = new DireccionUsuario();
        try {
            const usuario = await auth.getUser();
            let idEstado = 1;
            const { idMunicipio, direccion, puntoReferencia } = request.all();
            direccionUsuario.fill({
                idMunicipio,
                direccion,
                puntoReferencia,
                idEstado
            });
            await usuario.direccionesUsuario().save(direccionUsuario);
            respuesta = 'Se registro la dirección exitosamente '
            data = direccionUsuario;
        } catch (err) {
            codigoHttp = 500;
            codigo = -1;
            error = err.message;
            respuesta = 'Ocurrió un error al realizar la acción solicitada';
            data = null;
        }
        return response.status(codigoHttp).json({
            codigo,
            error,
            respuesta,
            data
        });
    }
    async actualizar({ auth, params, request, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;
        try {
            const usuario = await auth.getUser();
            const { id } = params;
            const direccionUsuario = await DireccionUsuario.find(id);
            await direccionUsuario.merge(request.only(['idMunicipio', 'direccion', 'puntoReferencia', 'idEstado']));
            await direccionUsuario.save();
            data = direccionUsuario;
            respuesta = 'Se actualizó la dirección exitosamente '
        } catch (err) {
            codigoHttp = 500;
            codigo = -1;
            error = err.message;
            respuesta = 'Ocurrió un error al realizar la acción solicitada';
            data = null;
        }
        return response.status(codigoHttp).json({
            codigo,
            error,
            respuesta,
            data
        });

    }
}

module.exports = DireccionUsuarioController
