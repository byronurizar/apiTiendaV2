'use strict'
const DetalleProductoCruzado = use('App/Models/DetalleProductoCruzado');
const Database = use('Database');
class DetalleProductoCruzadoController {
    async listar({ auth, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        const usuario = await auth.getUser();
        try {
            data = await DetalleProductoCruzado.all();
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
    async productosCruzados({ auth, params, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        const usuario = await auth.getUser();
        const { id } = params;
        try {

            const subconsulta = 'select id from producto_cruzados where idProducto=' + id;
            data = await Database
                .raw('select a.id as idProducto,a.nombre as Producto,a.descripcion as desc,a.descripcionCorta as descCorta,a.codigo as sku,a.precio,proveedors.id as idProveedor,cat_categorias.id as idCategoria,cat_categorias.descripcion as Categoria from detalle_producto_cruzados detalle inner join productos a on detalle.idProducto=a.id inner join proveedors on a.idProveedor=proveedors.id inner join cat_categorias on a.idCategoria=cat_categorias.id where detalle.idProductoCruzado in(' + subconsulta + ') and a.idEstado=1 and detalle.idEstado=1 and proveedors.idEstado=1 and cat_categorias.idEstado=1');

            if (data.length > 0) {
                data = data[0];
            } else {
                data = null;
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

    async productosCruzadosporProducto({ auth, params, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        const usuario = await auth.getUser();
        const { idProducto } = params;
        try {

            data = await Database
                .raw(`select detalle_producto_cruzados.id,productos.nombre,productos.codigo,productos.precio,productos.oferta from productos
                inner join detalle_producto_cruzados
                on productos.id=detalle_producto_cruzados.idProducto
                where detalle_producto_cruzados.idEstado=1 and detalle_producto_cruzados.idProductoCruzado in(
                select id from producto_cruzados where idProducto=${idProducto}
                )`);

            if (data.length > 0) {
                data = data[0];
            } else {
                data = null;
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

        const detalleProductoCruzado = new DetalleProductoCruzado();
        try {
            const usuario = await auth.getUser();
            const { idProductoCruzado, idProducto, idEstado } = request.all();
            detalleProductoCruzado.fill({
                idProductoCruzado,
                idProducto,
                idEstado
            });
            await usuario.detalleProductoCruzado().save(detalleProductoCruzado);
            respuesta = 'Se registro el detalle del producto cruzado exitosamente'
            data = detalleProductoCruzado;
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
            const detalleProductoCruzado = await DetalleProductoCruzado.find(id);
            await detalleProductoCruzado.merge(request.only(['idProductoCruzado', 'idProducto', 'idEstado']));

            await detalleProductoCruzado.save();
            data = detalleProductoCruzado;
            respuesta = 'Se actualizó el detalle del producto cruzado exitosamente';
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

module.exports = DetalleProductoCruzadoController
