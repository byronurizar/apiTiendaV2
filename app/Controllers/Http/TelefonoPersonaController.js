'use strict'
const TelefonoPersona = use('App/Models/TelefonoPersona');
const Database = use('Database');
class TelefonoPersonaController {
    async listar({ auth, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        const usuario = await auth.getUser();
        try {
            data = await TelefonoPersona.all();
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
    async telefonosPersona({ auth, params, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        const usuario = await auth.getUser();
        const { id } = params;
        try {
            data = await Database
                .select('personas.id as CodigoPersona', 'telefono_personas.*')
                .from('personas')
                .innerJoin('telefono_personas', 'personas.id', 'telefono_personas.idPersona')
                .where({ 'telefono_personas.idEstado': 1, 'personas.idEstado': 1, "personas.id": id })

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

        const telefonoPersona = new TelefonoPersona();
        try {
            const usuario = await auth.getUser();
            const { idPersona, telefono, idEstado } = request.all();
            telefonoPersona.fill({
                idPersona,
                telefono,
                idEstado
            });
            await usuario.telefonosPersona().save(telefonoPersona);
            respuesta = 'Se registro el teléfono exitosamente '
            data = telefonoPersona;
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
            const telefonoPersona = await TelefonoPersona.find(id);
            await telefonoPersona.merge(request.only(['telefono', 'idEstado']));
            await telefonoPersona.save();
            data = telefonoPersona;
            respuesta = 'Se actualizó el teléfono exitosamente '
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

module.exports = TelefonoPersonaController
