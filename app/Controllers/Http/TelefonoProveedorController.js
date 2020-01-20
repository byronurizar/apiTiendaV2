'use strict'
const TelefonoProveedor=use('App/Models/CatTelefonoProveedor');
const Database=use('Database');
class TelefonoProveedorController {
    async listar({ auth, params,response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        const usuario = await auth.getUser();
        try {
            const { id } = params;
            if(id>0){
                data = await TelefonoProveedor.query().where('idProveedor', '=', id).fetch();
            }else{
                data = await Database
                .table('vistaTelefonosProveedor')
                     //  Database.close();
            }
            
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

        const telefonoProveedor = new TelefonoProveedor();
        try {
            const usuario = await auth.getUser();
            const { idProveedor,telefono, idEstado } = request.all();
            telefonoProveedor.fill({
                idProveedor,
                telefono,
                idEstado
            });
            await usuario.telefonosProveedor().save(telefonoProveedor);
            respuesta = 'El teléfono del proveedor fue registrado exitosamente'
            data = telefonoProveedor;
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
            const telefonoProveedor = await TelefonoProveedor.find(id);
            await telefonoProveedor.merge(request.only(['idProveedor','telefono', 'idEstado']));

            await telefonoProveedor.save();
            data = telefonoProveedor;
            respuesta = 'El teléfono del proveedor fue actualizado exitosamente';
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

module.exports = TelefonoProveedorController
