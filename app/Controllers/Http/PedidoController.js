'use strict'
const Pedido = use('App/Models/Pedido');
const Database = use('Database');
const DetallePedido = use('App/Models/DetallePedido');
const Producto = use('App/Models/Producto');
class PedidoController {

    /*
    async listar({ auth, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        const usuario = await auth.getUser();
        try {
            data = await Pedido.all();
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
    */

    async pedidosUsuarios({ auth, params, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        const usuario = await auth.getUser();
        const { id,idRol } = usuario;
        let query={};
        if(idRol!==1){
        query={ user_id: id }
        }
        try {
            data = await Database
                .table('vistaPedidosUsuarios')
                .where(query);

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

    // async registrar({ request, response }) {
    //     let codigoHttp = 200;
    //     let codigo = 0;
    //     let error = '';
    //     let respuesta = '';
    //     let data = null;

    //     let idPedido = 0;
    //     let idTipoPago = request._body.idTipoPago;
    //     let idEstadoPedido = 1; //Enviado
    //     let user_id = 0;

    //     const { detallePedido } = request.all();
    //     const infoRecibe = request._body.data;
    //     //Crear pedido
    //     try {
    //         const pedido = await Pedido.create({
    //             idTipoPago,
    //             idEstadoPedido,
    //             user_id
    //         });
    //         idPedido = pedido.$attributes.id;
    //     } catch (err) {
    //         codigoHttp = 500;
    //         codigo = -1;
    //         error = err.message;
    //         respuesta = 'Ocurrió un error al crear el pedido';
    //         data = null;
    //         console.log(err);
    //     }

    //     try {

    //         const waitFor = (ms) => new Promise(r => setTimeout(r, ms))
    //         const asyncForEach = async (array, callback) => {
    //             for (let index = 0; index < array.length; index++) {
    //                 await callback(array[index], index, array)
    //             }
    //         }
    //         let contador = 1;
    //         let totalItem = detallePedido.length;

    //         const registrarDetallePedido = async () => {
    //             await asyncForEach(detallePedido, async (item) => {
    //                 await waitFor(50);
    //                 let { id, idTalla, idColor, cantidad } = item;
    //                 const producto = await Producto.find(id);
    //                 const { precio, oferta } = producto;
    //                 let descuento = precio - oferta;
    //                 if (oferta <= 0) {
    //                     descuento = 0;
    //                 }
    //                 const idProducto = id;
    //                 if (idTalla <= 0) {
    //                     idTalla = null;
    //                 }
    //                 if (idColor <= 0) {
    //                     idColor = null;
    //                 }

    //                 const detallePedidoInsert = await DetallePedido.create({
    //                     idPedido,
    //                     idProducto,
    //                     idTalla,
    //                     idColor,
    //                     cantidad,
    //                     precio,
    //                     descuento
    //                 });
    //             })
    //         }

    //         registrarDetallePedido()
    //     } catch (err) {
    //         codigoHttp = 500;
    //         codigo = -1;
    //         error = err.message;
    //         respuesta = 'Ocurrió un error al registrar el detalle del pedido';
    //         data = null;
    //         console.log(err);
    //     }

    //     try {
    //         const { nombres, apellidos, telefonos, municipio, direccion, puntoReferencia } = infoRecibe;
    //         const idMunicipio = municipio;
    //         const recibePedido = await RecibePedido.create({
    //             idPedido,
    //             nombres,
    //             apellidos,
    //             telefonos,
    //             idMunicipio,
    //             direccion,
    //             puntoReferencia
    //         });
    //         codigo = 0;
    //         respuesta = 'Registro exitoso';
    //         data = recibePedido;
    //     } catch (err) {
    //         codigoHttp = 500;
    //         codigo = -1;
    //         error = err.message;
    //         respuesta = 'Ocurrió un error al realizar la acción solicitada';
    //         data = null;
    //         console.log(err);
    //     }


    //     return response.status(codigoHttp).json({
    //         codigo,
    //         error,
    //         respuesta,
    //         data
    //     });
    // };

    async registrar({ auth, request, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        const pedido = new Pedido();
        try {
            const usuario = await auth.getUser();
            const user_id  = usuario.id;
            let idEstadoPedido = 1; //Enviado
            const { detallePedido } = request.all();
            const { costoEnvio, idTipoPago, idDireccionUsuario, observaciones } = request.all();
            if (detallePedido) {
                if (detallePedido.length > 0) {
                    pedido.fill({
                        idTipoPago,
                        idEstadoPedido,
                        user_id,
                        observaciones,
                        idDireccionUsuario,
                        costoEnvio
                    });
                     await usuario.pedidos().save(pedido);
                     const idPedido = pedido.id;
 
                   await detallePedido.map(async(item)=>{
                        let { id, idTalla, idColor, cantidad } = item;
                         let producto =await Producto.find(id);
                        const { precio, oferta } = producto;
                        let descuento = precio - oferta;
                        if (oferta <= 0) {
                            descuento = 0;
                        }
                        const idProducto = id;
                        if (idTalla <= 0) {
                            idTalla = null;
                        }
                        if (idColor <= 0) {
                            idColor = null;
                        }
                        const detallePedidoInsert = await DetallePedido.create({
                            idPedido,
                            idProducto,
                            idTalla,
                            idColor,
                            cantidad,
                            precio,
                            descuento
                        });
                    });
                    respuesta = 'Pedido registrado exitosamente'
                    data = idPedido;
                } else {
                    codigo = -1;
                    respuesta = "No fue posible registrar el pedido ya que no tiene ningun producto asociado"
                }
            } else {
                codigo = -1;
                respuesta = "No fue posible registrar el pedido, ya que no cuenta con ningún producto en su detalle"
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
    
    async actualizar({ auth, params, request, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;
        try {
            const usuario = await auth.getUser();
            const { id } = params;
            const pedido = await Pedido.find(id);
            await pedido.merge(request.only(['idEstadoPedido']));

            await pedido.save();
            data = pedido;
            respuesta = 'Pedido actualizado exitosamente';
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
    async detallepedido({ params, response }) {
        let codigoHttp = 200;
        const { id } = params;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;
        try {
            data = await Database
                .table('vistaDetallePedido')
                .where("id", id);
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

    async listarInfoDetallePedido({ params, response }) {
        let codigoHttp = 200;
        const { id } = params;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;
        try {
            data = await Database
                .table('vistaInfoPedido')
                .where("id", id);
            Database.close();
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

module.exports = PedidoController
