'use strict'
const RecibePedido = use('App/Models/InfoRecibePedido');
const Pedido = use('App/Models/Pedido');
const DetalledetallePedido = use('App/Models/DetallePedido');
const Producto = use('App/Models/Producto');
const Database = use('Database');
class InfoRecibePedidoController {
    async registrar({ request, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        let idPedido = 0;
        let idTipoPago = request._body.idTipoPago;
        let idEstadoPedido = 1; //Enviado
        let user_id = 0;

        //Crear pedido
        try {
            const pedido = await Pedido.create({
                idTipoPago,
                idEstadoPedido,
                user_id
            });
            idPedido = pedido.$attributes.id;
            console.log("Id pedido", idPedido);
        } catch (err) {
            codigoHttp = 500;
            codigo = -1;
            error = err.message;
            respuesta = 'Ocurrió un error al crear el pedido';
            data = null;
            console.log(err);
        }

        try {


            request._body.detallePedido.forEach(item => {
                let idProducto = item.id;
                let idTalla = item.idTalla;
                let idColor = item.idColor;
                let cantidad = item.cantidad;

                console.log("Item", item);
                data = await Database
                .table('vistaComercioProductos')

             //const producto=Producto.find(idProducto);
console.log("Producto",data);
                // await producto.forEach(fila => {
                //     console.log("Fila", fila);
                // });

                let precio = 0;
                let descuento = 0;
            })


        } catch (err) {
            codigoHttp = 500;
            codigo = -1;
            error = err.message;
            respuesta = 'Ocurrió un error al registrar el detalle del pedido';
            data = null;
            console.log(err);
        }


        // console.log("Data", request._body.dataPedido);
        try {
            const { idPedido, nombres, apellidos, telefonos, idMunicipio, direccion, puntoReferencia } = request.all();
            const recibePedido = await RecibePedido.create({
                idPedido,
                nombres,
                apellidos,
                telefonos,
                idMunicipio,
                direccion,
                puntoReferencia
            });

            respuesta = 'Registro exitoso';
            data = recibePedido;
        } catch (err) {
            codigoHttp = 500;
            codigo = -1;
            error = err.message;
            respuesta = 'Ocurrió un error al realizar la acción solicitada';
            data = null;
            console.log(err);
        }
        return response.status(codigoHttp).json({
            codigo,
            error,
            respuesta,
            data
        });
    };
}

module.exports = InfoRecibePedidoController
