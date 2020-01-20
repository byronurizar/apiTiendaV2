'use strict'
const TipoPago=use('App/Models/CatTipoPago');
const Database=use('Database');
class CatTipoPagoController {
    async listar({ response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        // const usuario = await auth.getUser();
        try {
            // data = await TipoPago.all();
            data = await Database
            .table('vistaTiposdePago')
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

        const tipoPago = new TipoPago();
        try {
            const usuario = await auth.getUser();
            const { descripcion, idEstado,esTipoDeposito } = request.all();
            tipoPago.fill({
                descripcion,
                esTipoDeposito,
                idEstado
            });
            await usuario.tiposPago().save(tipoPago);
            respuesta = 'Tipo de pago registrado exitosamente'
            data = tipoPago;
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
            const tipoPago = await TipoPago.find(id);
            await tipoPago.merge(request.only(['descripcion','esTipoDeposito','idEstado']));

            await tipoPago.save();
            data = tipoPago;
            respuesta = 'Tipo de pago actualizado exitosamente';
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

module.exports = CatTipoPagoController
