'use strict'
const CatTipoInfoAdicional = use('App/Models/CatTipoInfoAdicional');
class CatTipoInfoAdicionalProductoController {
    async listar({ response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;
        try {
            data = await CatTipoInfoAdicional.all();
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
        try {
            const usuario = await auth.getUser();
            const { descripcion, idEstado } = request.all();
            const catTipoInfoAdicional = new CatTipoInfoAdicional();
            catTipoInfoAdicional.descripcion = descripcion;
            catTipoInfoAdicional.idEstado = idEstado;
            await catTipoInfoAdicional.save();
            respuesta = 'Tipo de Información adicional registrado exitosamente'
            data = catTipoInfoAdicional;
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

module.exports = CatTipoInfoAdicionalProductoController
