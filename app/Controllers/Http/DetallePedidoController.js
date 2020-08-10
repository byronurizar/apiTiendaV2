'use strict'
const DetalledetallePedido = use('App/Models/DetallePedido');
class DetalledetallePedidoController {
    async listar({ auth, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        const usuario = await auth.getUser();
        try {
            data = await DetalledetallePedido.all();
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

        const detallePedido = new DetalledetallePedido();
        try {
            const usuario = await auth.getUser();
            const { idPedido, idProducto, idTalla, idColor, cantidad, precio, descuento } = request.all();
            detallePedido.fill({
                idPedido,
                idProducto,
                idTalla,
                idColor,
                cantidad,
                precio,
                descuento
            });
            await usuario.detallePedido().save(detallePedido);
            respuesta = 'Detalle de pedido registrado exitosamente'
            data = detallePedido;
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
            const detallePedido = await DetalledetallePedido.find(id);
            await detallePedido.merge(request.only(['idPedido', 'idProducto', 'idTalla', 'idColor', 'cantidad', 'precio', 'descuento','idEstado']));

            await detallePedido.save();
            data = detallePedido;
            respuesta = 'Detalle de Pedido actualizado exitosamente';
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

module.exports = DetalledetallePedidoController
