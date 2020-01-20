'use strict'
const Persona=use('App/Models/Persona');
class PersonaController {
    async listar({ auth, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        const usuario = await auth.getUser();
        try {
            data = await Persona.all();
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

        const persona = new Persona();
        try {
            const usuario = await auth.getUser();
            const {primerNombre,segundoNombre,otrosNombres,primerApellido,segundoApellido,otrosApellidos,fechaNacimiento,idGenero,correo,idMunicipio,idEstado } = request.all();
            persona.fill({
                primerNombre,
                segundoNombre,
                otrosNombres,
                primerApellido,
                segundoApellido,
                otrosApellidos,
                fechaNacimiento,
                idGenero,
                correo,
                idMunicipio,
                idEstado                
            });
            await usuario.personas().save(persona);
            respuesta = 'Persona registrada exitosamente'
            data = persona;
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
            const persona = await Persona.find(id);
            await persona.merge(request.only(['primerNombre','segundoNombre','otrosNombres','primerApellido','segundoApellido','otrosApellidos','fechaNacimiento','idGenero','correo','idMunicipio','idEstado']));
            await persona.save();
            data = persona;
            respuesta = 'Persona actualizada exitosamente'
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

module.exports = PersonaController
