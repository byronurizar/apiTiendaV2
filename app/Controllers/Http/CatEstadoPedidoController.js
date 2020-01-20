'use strict'
const EstadoPedido=use('App/Models/CatEstadoPedido');
const Database=use('Database');
class CatEstadoPedidoController {
    async listar({ auth, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        const usuario = await auth.getUser();
        try {
            data = await Database
            .table('vistaEstadoPedido')
              //     Database.close();
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

        const estadoPedido = new EstadoPedido();
        try {
            const usuario = await auth.getUser();
            const { descripcion, idEstado } = request.all();
            estadoPedido.fill({
                descripcion,
                idEstado
            });
            await usuario.estadosPedido().save(estadoPedido);
            respuesta = 'Estado de pedido registrado exitosamente'
            data = estadoPedido;
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
            const estadoPedido = await EstadoPedido.find(id);
            await estadoPedido.merge(request.only(['descripcion', 'idEstado']));

            await estadoPedido.save();
            data = estadoPedido;
            respuesta = 'Estado de pedido actualizado exitosamente';
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

module.exports = CatEstadoPedidoController
