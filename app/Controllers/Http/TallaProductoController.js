'use strict'
const TallaProducto = use('App/Models/TallaProducto');
const Database = use('Database');
class TallaProductoController {
    async listar({ auth, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        const usuario = await auth.getUser();
        try {
            // data = await TallaProducto.all();

            data = await Database
                .table('vistaTallas')
         //   Database.close();

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
    async tallaProducto({ auth, params, response }) {
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
                    'talla_productos.id as idTalla',
                    'talla_productos.descripcion as talla'
                )
                .from('productos')
                .innerJoin('stock_productos', 'productos.id', 'stock_productos.idProducto')
                .innerJoin('talla_productos', 'stock_productos.idTalla', 'talla_productos.id')
                .where({ 'productos.idEstado': 1, 'stock_productos.idEstado': 1, 'talla_productos.idEstado': 1, "productos.id": id })

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

        const tallaProducto = new TallaProducto();
        try {
            const usuario = await auth.getUser();
            const { descripcion, idEstado } = request.all();
            tallaProducto.fill({
                descripcion,
                idEstado
            });
            await usuario.tallas().save(tallaProducto);
            respuesta = 'Talla registrada exitosamente'
            data = tallaProducto;
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
            const tallaProducto = await TallaProducto.find(id);
            await tallaProducto.merge(request.only(['descripcion', 'idEstado']));

            await tallaProducto.save();
            data = tallaProducto;
            respuesta = 'Talla actualizada exitosamente';
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

module.exports = TallaProductoController
