'use strict'
const ProductoCruzado = use('App/Models/ProductoCruzado');
const Database = use('Database');
class ProductoCruzadoController {
    async listarPorProducto({  params,response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        // const usuario = await auth.getUser();
        try {
            const {idProducto}=params;
            data =await Database
            .raw(`select * from vistaComercioProductos where id in(
                select idProducto from detalle_producto_cruzados where idProductoCruzado in(
                    select id from producto_cruzados where idProducto=${idProducto}
                    )
            )`);
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

        const productoCruzado = new ProductoCruzado();
        try {
            const usuario = await auth.getUser();
            const { idProducto, idEstado } = request.all();
            productoCruzado.fill({
                idProducto,
                idEstado
            });
            await usuario.productosCruzados().save(productoCruzado);
            respuesta = 'Producto Cruzado registrado exitosamente'
            data = productoCruzado;
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
            const productoCruzado = await ProductoCruzado.find(id);
            await productoCruzado.merge(request.only(['idProducto', 'idEstado']));

            await productoCruzado.save();
            data = productoCruzado;
            respuesta = 'Producto Cruzado actualizado exitosamente';
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

module.exports = ProductoCruzadoController
