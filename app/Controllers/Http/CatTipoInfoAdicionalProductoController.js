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
}

module.exports = CatTipoInfoAdicionalProductoController
