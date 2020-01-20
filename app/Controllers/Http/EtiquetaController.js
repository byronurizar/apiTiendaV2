'use strict'
const Etiqueta=use('App/Models/CatEtiqueta');
const Database=use('Database');
class EtiquetaController {
    async listar({ auth, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        const usuario = await auth.getUser();
        try {
            // data = await Etiqueta.all();
            data = await Database
            .table('vistaEtiquetas')
         //   await Database.close();
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

        const etiqueta = new Etiqueta();
        try {
            const usuario = await auth.getUser();
            const {descripcion,idEstado } = request.all();
            etiqueta.fill({
                descripcion,
                idEstado
            });
            await usuario.etiquetas().save(etiqueta);
            respuesta = 'Se registro la etiqueta exitosamente '
            data = etiqueta;
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
            const etiqueta = await Etiqueta.find(id);
            await etiqueta.merge(request.only(['descripcion','idEstado']));
            await etiqueta.save();
            data = etiqueta;
            respuesta = 'Se actualizo la etiqueta exitosamente '
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

module.exports = EtiquetaController
