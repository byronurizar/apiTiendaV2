'use strict'
const DetalleTipoPago=use('App/Models/DetalleTipoPago');
const Database=use('Database');
class DetalleTipoPagoController {
    async listar({ auth, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        const usuario = await auth.getUser();
        try {
            // data = await DetalleTipoPago.all();
            data=await Database
            .table('vistaDetalleTipoPago');
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

        const detallePedido = new DetalleTipoPago();
        try {
            const usuario = await auth.getUser();
            const {idTipoPago,nombreBanco,nombreCuenta,numeroCuenta,tipoCuenta,idEstado } = request.all();
            detallePedido.fill({
                idTipoPago,
                nombreBanco,
                nombreCuenta,
                numeroCuenta,
                tipoCuenta,
                idEstado
            });
            await usuario.detalleTipoPago().save(detallePedido);
            respuesta = 'Detalle de tipo de pago registrado exitosamente'
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
            const detallePedido = await DetalleTipoPago.find(id);
            await detallePedido.merge(request.only(['idTipoPago','nombreBanco','nombreCuenta','numeroCuenta','tipoCuenta','idEstado']));

            await detallePedido.save();
            data = detallePedido;
            respuesta = 'Detalle de tipo de pago actualizado exitosamente';
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

module.exports = DetalleTipoPagoController
