'use strict'
const Catalogo=use('App/Models/Catalogo');
const Database=use('Database');
class CatalogoController {
    async listar({ auth,params, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        const usuario = await auth.getUser();
        try {
            // data = await Catalogo.all();

            const { id } = params;
            if(id>0){
                data=await Database
                .table('vistaCatalogos')
                .where({proveedorid:id});
          //      await Database.close();
            }else{
                data=await Database
                .table('vistaCatalogos');
             //   await Database.close();
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

        const catalogo = new Catalogo();
        try {
            const usuario = await auth.getUser();
            const {idProveedor,descripcion,idEstado } = request.all();
            catalogo.fill({
                idProveedor,
                descripcion,
                idEstado
            });
            await usuario.catalogos().save(catalogo);
            respuesta = 'Se registro el catálogo exitosamente '
            data = catalogo;
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
            const catalogo = await Catalogo.find(id);
            await catalogo.merge(request.only(['idProveedor','descripcion','idEstado']));
            await catalogo.save();
            data = catalogo;
            respuesta = 'Se actualizo el catálogo exitosamente '
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

module.exports = CatalogoController
