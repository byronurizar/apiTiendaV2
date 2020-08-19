'use strict'
const InfoAdicionalProducto=use('App/Models/InfoAdicionalProducto');
const Database = use('Database');
class InfoAdicionalProductoController {
    async listarParaScraping({ auth,response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;
        const usuario = await auth.getUser();
        try {
            data = await InfoAdicionalProducto.all();
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


    async listar({  params, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        // const usuario = await auth.getUser();
        try {
            const { id } = params;
            data = await InfoAdicionalProducto.query().where('idProducto', '=', id).fetch();
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
    async listarinfosmarttable({  auth,params, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        const usuario = await auth.getUser();
        try {
            const { id } = params;
            data = await Database
            .table('vistainfoadicionalsmartable')
            .where({idProducto:id})
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
    
    async infoadicional({  params, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        try {
            const { id } = params;
            data = await Database
            .table('vistaproductoinfoadicional')
            .where({idProducto:id})
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

        const infoAdicional = new InfoAdicionalProducto();
        try {
            const usuario = await auth.getUser();
            const { idProducto,idTipoInfoAdicional,valor,idEstado } = request.all();
            infoAdicional.fill({
                idProducto,
                idTipoInfoAdicional,
                valor,
                idEstado
            });
            await usuario.infoAdicionalProductos().save(infoAdicional);
            respuesta = 'Se registró la información adicional al producto exitosamente'
            data = infoAdicional;
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
            const infoAdicional = await InfoAdicionalProducto.find(id);
            await infoAdicional.merge(request.only(['idProducto','idTipoInfoAdicional','valor','idEstado']));
            await infoAdicional.save();
            data = infoAdicional;
            respuesta = 'Se actualizó la información adicional al producto exitosamente'
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

module.exports = InfoAdicionalProductoController
