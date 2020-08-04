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
    async direccionesUsuario({ auth, request, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;
        const query=request.get();
        let queryWhere={};
        const idDireccion=query.id;
        console.log({idDireccion});
        if(idDireccion){
            queryWhere.id=idDireccion;
        }
        
        const usuario = await auth.getUser();
        const { id } = usuario;
        queryWhere.user_id=id;
        queryWhere.idEstado=1;

        try {
            data = await Database
                .table('vistaDireccionesUsuario')
                .where(queryWhere);
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
            const {nombre,apellido,telefono,idMunicipio, direccion, puntoReferencia } = request.all();
            direccionUsuario.fill({
                nombre,
                apellido,
                telefono,
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
            await direccionUsuario.merge(request.only(['nombre','apellido','telefono','idMunicipio', 'direccion', 'puntoReferencia', 'idEstado']));
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
