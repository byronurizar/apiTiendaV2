'use strict'
const Proveedor = use('App/Models/Proveedor');
const Database = use('Database');
class ProveedorController {
    async listar({ auth, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        const usuario = await auth.getUser();
        try {
            // data = await Proveedor.all();
            data = await Database
                .table('vistaProveedores')
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

        const proveedor = new Proveedor();
        try {
            const usuario = await auth.getUser();
            const { nombre, descripcion, direccion, idEstado } = request.all();
            proveedor.fill({
                nombre,
                descripcion,
                direccion,
                idEstado
            });
            await usuario.proveedores().save(proveedor);
            respuesta = 'Proveedor registrado exitosamente'
            data = proveedor;
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
            const proveedor = await Proveedor.find(id);
            await proveedor.merge(request.only(['nombre', 'descripcion', 'direccion', 'idEstado']));

            await proveedor.save();
            data = proveedor;
            respuesta = 'Proveedor actualizado exitosamente';
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

module.exports = ProveedorController
