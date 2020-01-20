'use strict'
const Producto = use('App/Models/Producto');
const ImagenProducto = use('App/Models/ImagenProducto');
const Database = use('Database');
class ImagenProductoController {
    async listar({params, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;
        const { id } = params;
        console.log("idProducto",id);
        try {
            // data = await ImagenProducto.query().where('idProducto', '=', id).fetch();
            data=await Database
            .table('vistaImagenesProducto')
            .where({idProducto:id})
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
    async imagenesProducto({ auth, params, response }) {
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
                    'imagen_productos.id as idImagen',
                    'imagen_productos.pathImagen as pathImagen',
                    'imagen_productos.codigoImagen as codigoImagen',
                    'imagen_productos.esImagenPrincipal as esImagenPrincipal'
                )
                .from('productos')
                .innerJoin('imagen_productos', 'productos.id', 'imagen_productos.idProducto')
                .where({ 'productos.idEstado': 1, 'imagen_productos.idEstado': 1, "productos.id": id })

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

        const imagenProducto = new ImagenProducto();
        try {
            const usuario = await auth.getUser();
            const { idProducto, esImagenPrincipal, idEstado } = request.all();
            const id = idProducto;
            const producto = await Producto.find(id);
            const { idCatalogo, idCategoria } = producto;

            const fechaActual = new Date();

            const anio = fechaActual.getFullYear();
            const pathImagen0 = `public/Imagenes/${anio}/Catalogo${idCatalogo}/Categoria${idCategoria}/`;
            const pathImagen = `Imagenes/${anio}/Catalogo${idCatalogo}/Categoria${idCategoria}/`;
            const extension = '.jpg';
            const codigoImagen = `${idCatalogo}${idCategoria}${Date.now()}${extension}`;

            const BinarioImagen = request.file('imagen', {
                types: ['image'],
                size: '2mb',
                extnames: ['png', 'jpg', 'jpeg']
            });

            await BinarioImagen.move(`./${pathImagen0}`, {
                name: codigoImagen,
                overwrite: true
            });


            if (!BinarioImagen.moved()) {
                codigoHttp = 500;
                codigo = -1;
                error = "No se logró cargar la imagen";
                respuesta = 'Ocurrió un error al realizar la acción solicitada';
                data = null;
            } else {
                imagenProducto.fill({
                    idProducto,
                    pathImagen,
                    codigoImagen,
                    esImagenPrincipal,
                    idEstado
                });
                await usuario.tallas().save(imagenProducto);
                respuesta = 'Imagen registrada exitosamente'
                data = imagenProducto;
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
            const imagenProducto = await ImagenProducto.find(id);

            const { idProducto } = imagenProducto;

            const producto = await Database.select('*').from('productos').where({ id: idProducto });
            const { idCatalogo, idCategoria } = producto;
            const idCatalogo = producto[0].idCatalogo;
            const idCategoria = producto[0].idCategoria
            const fechaActual = new Date();
            const anio = fechaActual.getFullYear();
            const pathImagen = `Imagenes/${anio}/Catalogo${idCatalogo}/Categoria${idCategoria}/`;
            const extension = '.jpg';
            const codigoImagen = `${idCatalogo}${idCategoria}${Date.now()}${extension}`;

            const BinarioImagen = request.file('imagen', {
                types: ['image'],
                size: '2mb',
                extnames: ['png', 'jpg', 'jpeg']
            });

            await BinarioImagen.move(`./${pathImagen}`, {
                name: codigoImagen,
                overwrite: true
            });

            if (!BinarioImagen.moved()) {
                codigoHttp = 500;
                codigo = -1;
                error = "No se logró cargar la imagen";
                respuesta = 'Ocurrió un error al realizar la acción solicitada';
                data = null;
            } else {

                const { idProducto, esImagenPrincipal, idEstado } = request.all();
                await imagenProducto.merge({ idProducto, esImagenPrincipal, idEstado, codigoImagen, pathImagen });
                await imagenProducto.save();
                data = imagenProducto;
                respuesta = 'Imagen actualizada exitosamente';
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
}

module.exports = ImagenProductoController
