'use strict'
const Pedido=use('App/Models/Pedido');
const Database = use('Database');
class PedidoController {
    async listar({ auth, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        const usuario = await auth.getUser();
        try {
            data = await Pedido.all();
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

        const pedido = new Pedido();
        try {
            const usuario = await auth.getUser();
            const {idPersona,idTipoPago,idEstadoPedido} = request.all();
            pedido.fill({
                idPersona,
                idTipoPago,
                idEstadoPedido
            });
            await usuario.pedidos().save(pedido);
            respuesta = 'Pedido registrado exitosamente'
            data = pedido;
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
            const pedido = await Pedido.find(id);
            await pedido.merge(request.only(['idPersona','idTipoPago','idEstadoPedido']));

            await pedido.save();
            data = pedido;
            respuesta = 'Pedido actualizado exitosamente';
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
    async listarInfoDetallePedido({params, response }) {
        let codigoHttp = 200;
        const {id}=params;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;
        try {
            data = await Database
                .table('vistaInfoPedido')
                .where("id",id);
                Database.close();
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

module.exports = PedidoController
