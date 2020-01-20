'use strict'
const EtiquetaProducto = use('App/Models/CatEtiquetaProducto');
const Database = use('Database');
class EtiquetaProductoController {
    async listar({ auth, params, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        const usuario = await auth.getUser();
        try {
            const { id } = params;

            data = await Database
                .table('vistaEtiquetasProducto')
                .where({ productoid: id })
           // Database.close();

            // .select('productos.id as idProducto',
            //     'productos.nombre as Producto',
            //     'productos.descripcion as descripcionProducto',
            //     'productos.descripcionCorta as descripcionCorta',
            //     'productos.codigo as sku',
            //     'productos.precio',
            //     'cat_etiquetas.id as idAsignacion',
            //     'cat_etiquetas.descripcion as Etiqueta',
            //     'cat_etiquetas.id as idEtiqueta')
            // .from('productos')
            // .innerJoin('cat_etiqueta_productos', 'productos.id', 'cat_etiqueta_productos.idProducto')
            // .innerJoin('cat_etiquetas', 'cat_etiqueta_productos.idEtiqueta', 'cat_etiquetas.id')
            // .where({ 'productos.idEstado': 1, 'cat_etiqueta_productos.idEstado': 1, 'cat_etiquetas.idEstado': 1,'productos.id':id})


            await EtiquetaProducto.query().where({ 'idEstado': 1, 'idProducto': id }).fetch();
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

        const etiquetaProducto = new EtiquetaProducto();
        try {
            const usuario = await auth.getUser();
            const { idProducto, idEtiqueta, idEstado } = request.all();
            etiquetaProducto.fill({
                idEtiqueta,
                idProducto,
                idEstado
            });
            await usuario.etiquetasProductos().save(etiquetaProducto);
            respuesta = 'Se asignó la etiqueta al producto exitosamente'
            data = etiquetaProducto;
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
            const etiquetaProducto = await EtiquetaProducto.find(id);
            await etiquetaProducto.merge(request.only(['idProducto', 'idEtiqueta', 'idEstado']));
            await etiquetaProducto.save();
            data = etiquetaProducto;
            respuesta = 'Se actualizó la asignación de etiqueta al producto exitosamente'
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

module.exports = EtiquetaProductoController
