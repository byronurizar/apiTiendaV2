'use strict'
const Deptartamento = use('App/Models/CatDepartamento');
const Database = use('Database');
class DepartamentoController {
    async listar({  response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        // const usuario = await auth.getUser();
        try {
            // data = await Deptartamento.all();
            data = await Database
            .table('vistaDepartamentos')
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

        const departamento = new Deptartamento();
        try {
            const usuario = await auth.getUser();
            const { descripcion,idEstado } = request.all();
            departamento.fill({
                descripcion,
                idEstado
            });
            await usuario.departamentos().save(departamento);
            respuesta = 'Departamento registrado exitosamente'
            data = departamento;
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
            const departamento = await Deptartamento.find(id);
            await departamento.merge(request.only(['descripcion','idEstado']));

            await departamento.save();
            data = departamento;
            respuesta = 'Departamento actualizado exitosamente';
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

module.exports = DepartamentoController
