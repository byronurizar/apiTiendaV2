'use strict'
const AsigTallaProducto = use('App/Models/AsigTallaProducto');
const Database = use('Database');
class AsigTallaProductoController {
    async listar({ params, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        const { id } = params;
        try {
            data = await Database
                .table('vistaTallasProducto')
                .where({productoid:id})
          //  Database.close();
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

        const productoTalla = new AsigTallaProducto();
        try {
            const usuario = await auth.getUser();
            const { idProducto,idTalla, idEstado } = request.all();
            productoTalla.fill({
                idProducto,
                idTalla,
                idEstado
            });
            await usuario.asingColorProducto().save(productoTalla);
            respuesta = 'Se asigno el color exitosamente'
            data = productoTalla;
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
            const productoTalla = await AsigTallaProducto.find(id);
            await productoTalla.merge(request.only(['idProducto','idTalla', 'idEstado']));
            await productoTalla.save();
            data = productoTalla;
            respuesta = 'Color actualizado exitosamente';
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

module.exports = AsigTallaProductoController
