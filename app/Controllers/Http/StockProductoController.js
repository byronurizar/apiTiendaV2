'use strict'
const StockProducto=use('App/Models/StockProducto');
class StockProductoController {
    async listar({ auth, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        const usuario = await auth.getUser();
        try {
            data = await StockProducto.all();
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

        const stockProducto = new StockProducto();
        try {
            const usuario = await auth.getUser();
            const {idProducto,idTalla,idColor,stockDisponible,idEstado } = request.all();
            stockProducto.fill({
                idProducto,
                idTalla,
                idColor,
                stockDisponible,
                idEstado
            });
            await usuario.stockProducto().save(stockProducto);
            respuesta = 'Stock registrado exitosamente'
            data = stockProducto;
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
            const stockProducto = await StockProducto.find(id);
            await stockProducto.merge(request.only(['idProducto','idTalla','idColor','stockDisponible','idEstado']));

            await stockProducto.save();
            data = stockProducto;
            respuesta = 'Stock actualizado exitosamente';
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

module.exports = StockProductoController
