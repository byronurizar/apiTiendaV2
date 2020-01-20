'use strict'
const DireccionPersona = use('App/Models/DireccionPersona');
const Database = use('Database');
class DireccionPersonaController {
    async listar({ auth, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        const usuario = await auth.getUser();
        try {
            data = await DireccionPersona.all();
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
    async direccionesPersona({ auth, params, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        const usuario = await auth.getUser();
        const { id } = params;
        try {
            data = await Database
                .select('personas.id as CodigoPersona', 'direccion_personas.*','cat_municipios.descripcion as Municipio','cat_municipios.id as codigoMunicipio')
                .from('personas')
                .innerJoin('direccion_personas', 'personas.id', 'direccion_personas.idPersona')
                .innerJoin('cat_municipios', 'cat_municipios.id', 'direccion_personas.idMunicipio')
                .where({ 'direccion_personas.idEstado': 1, 'personas.idEstado': 1, "personas.id": id })

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

        const direccionPersona = new DireccionPersona();
        try {
            const usuario = await auth.getUser();
            const { idPersona, idMunicipio, direccion, puntoReferencia, idEstado } = request.all();
            direccionPersona.fill({
                idPersona,
                idMunicipio,
                direccion, 
                puntoReferencia, 
                idEstado
            });
            await usuario.direccionesPersona().save(direccionPersona);
            respuesta = 'Se registro la dirección exitosamente '
            data = direccionPersona;
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
            const direccionPersona = await DireccionPersona.find(id);
            await direccionPersona.merge(request.only(['idPersona','idMunicipio','direccion','puntoReferencia','idEstado']));
            await direccionPersona.save();
            data = direccionPersona;
            respuesta = 'Se actualizó la dirección exitosamente '
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

module.exports = DireccionPersonaController
