'use strict'
const CatColores = use('App/Models/CatColore');
const Database = use('Database');
class CatColoreController {
    async listar({ auth, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        const usuario = await auth.getUser();
        try {
            // data = await CatColores.all();
            data = await Database
            .table('vistaColores')
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
    async coloresProducto({ auth, params, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        const usuario = await auth.getUser();
        const { id } = params;
        try {
            data = await Database
                .select('productos.id as idProducto',
                    'productos.nombre as Producto',
                    'cat_colores.id as idColor',
                    'cat_colores.descripcion as Color'
                )
                .from('productos')
                .innerJoin('stock_productos', 'productos.id', 'stock_productos.idProducto')
                .innerJoin('cat_colores', 'stock_productos.idColor', 'cat_colores.id')
                .where({ 'productos.idEstado': 1, 'stock_productos.idEstado': 1, 'cat_colores.idEstado': 1, "productos.id": id })

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

        const catColores = new CatColores();
        try {
            const usuario = await auth.getUser();
            const { descripcion, idEstado } = request.all();
            catColores.fill({
                descripcion,
                idEstado
            });
            await usuario.colores().save(catColores);
            respuesta = 'Color registrado exitosamente'
            data = catColores;
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
            const catColores = await CatColores.find(id);
            await catColores.merge(request.only(['descripcion', 'idEstado']));

            await catColores.save();
            data = catColores;
            respuesta = 'Color actualizado exitosamente';
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

module.exports = CatColoreController
