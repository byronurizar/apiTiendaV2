'use strict'
const AsigColorProducto = use('App/Models/AsigColorProducto');
const Database = use('Database');
class AsigColorProductoController {
    async listar({params, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        // const usuario = await auth.getUser();
        const { id } = params;
        try {
            data = await Database
                .table('vistaColoresProducto')
                .where({productoid:id})
           // Database.close();
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

        const productoColor = new AsigColorProducto();
        try {
            const usuario = await auth.getUser();
            const { idProducto,idColor, idEstado } = request.all();
            productoColor.fill({
                idProducto,
                idColor,
                idEstado
            });
            await usuario.asingColorProducto().save(productoColor);
            respuesta = 'Se asigno el color exitosamente'
            data = productoColor;
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
            const productoColor = await AsigColorProducto.find(id);
            await productoColor.merge(request.only(['idProducto','idColor', 'idEstado']));
            await productoColor.save();
            data = productoColor;
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

module.exports = AsigColorProductoController
