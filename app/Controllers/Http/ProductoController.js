'use strict'
const Producto = use('App/Models/Producto');
const Database = use('Database');
class ProductoController {
        async listarParaScraping({ auth,response }) {
            let codigoHttp = 200;
            let codigo = 0;
            let error = '';
            let respuesta = '';
            let data = null;
            const usuario = await auth.getUser();
            try {
                data = await Producto.all();
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

    async comercioListar({response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        try {
            data = await Database
                .table('vistaComercioProductos')
            //    Database.close();
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
    async comercioxcatalogxcategoria({ params,response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;
        const { idCatalogo,idCategoria } = params;
        let filtro={};
        if(idCatalogo==0 && idCategoria==0){

        }else{
            filtro.idCatalogo=idCatalogo;
            filtro.idCategoria=idCategoria;
            

        }
        try {
            data = await Database
                .table('vistaComercioProductos')
                .where(filtro)
            //    Database.close();
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
    async comercioListarFiltro({ request,response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;
        const { filtro } = request.all();
        
        try {
                data = await Database
                .raw(`select * from vistaComercioProductos where nombre like '%${filtro}%' or descripcion like '%${filtro}%' or descripcionCorta like '%${filtro}%' or catalogo like '%${filtro}%' or categoria like '%${filtro}%' or proveedor like '%${filtro}%';`)
            if (data.length > 0) {
                data = data[0];
            } else {
                data = null;
            }
            //    Database.close();
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

    async infoProducto({ params, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;
        const { id } = params;
        try {
            // data = await Producto.query().where('id', '=', id).fetch();
            
            data =await Database
            .select('vistaComercioProductos.id','vistaComercioProductos.nombre','vistaComercioProductos.descripcion','vistaComercioProductos.descripcionCorta','vistaComercioProductos.pathImagen','vistaComercioProductos.esImagenPrincipal',
            'vistaComercioProductos.precio','vistaComercioProductos.oferta','proveedors.nombre as proveedor','proveedors.num_dias_minimo_ciudad','proveedors.num_dias_maximo_ciudad','proveedors.num_dias_minimo_interior','proveedors.num_dias_maximo_interior','proveedors.observaciones',
            'catalogos.descripcion as catalogo')
            .from('vistaComercioProductos')
            .innerJoin('catalogos','vistaComercioProductos.idCatalogo','catalogos.id')
            .innerJoin('proveedors','catalogos.idProveedor','proveedors.id')
            .where('vistaComercioProductos.id',id)
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

    async listarProductoPorCategoria({ auth,params,response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;
        const usuario = await auth.getUser();
        try {
            const { idCatalogo,idProducto } = params;
            data =await Database
            .raw(`select productos.id,productos.nombre,productos.codigo,productos.precio,productos.oferta from productos
            inner join catalogos
            on productos.idCatalogo=catalogos.id
            inner join proveedors
            on catalogos.idProveedor=proveedors.id
            where productos.idEstado=1 and catalogos.idEstado=1 and proveedors.idEstado=1 and productos.idCategoria=${idCatalogo}
            and productos.id not in(
            select idProducto from detalle_producto_cruzados
            where idProductoCruzado in(
            select id from producto_cruzados where idProducto=${idProducto}
            )
            )`)

            if (data.length > 0) {
                data = data[0];
            } else {
                data = null;
            }
            
            // .select('productos.id','productos.nombre','productos.codigo','productos.precio','productos.oferta')
            // .from('productos')
            // .innerJoin('catalogos','productos.idCatalogo','catalogos.id')
            // .innerJoin('proveedors','catalogos.idProveedor','proveedors.id')
            // .where({'productos.idCategoria':id,'productos.idEstado':1,'catalogos.idEstado':1,'proveedors.idEstado':1})
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



    async listar({ auth, params, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;
        const { tipo, id } = params;

        const usuario = await auth.getUser();
        let stringWhere = { 'productos.idEstado': 1, 'proveedors.idEstado': 1, 'cat_categorias.idEstado': 1 };
        if (params) {
            if (tipo == "proveedor") {
                stringWhere = { 'productos.idEstado': 1, 'proveedors.idEstado': 1, 'cat_categorias.idEstado': 1, 'idProveedor': id };
            } else if (tipo == "categoria") {
                stringWhere = { 'productos.idEstado': 1, 'proveedors.idEstado': 1, 'cat_categorias.idEstado': 1, 'idCategoria': id };
            }
        }
        try {
            data = await Database
                .select('productos.id as idProducto',
                    'productos.nombre as Producto',
                    'productos.descripcion as descripcionProducto',
                    'productos.descripcionCorta as descripcionCorta',
                    'productos.codigo as sku',
                    'productos.precio',
                    'proveedors.id as idProveedor',
                    'proveedors.nombre as Proveedor',
                    'cat_categorias.id as idCategoria',
                    'cat_categorias.descripcion as Categoria')
                .from('productos')
                .innerJoin('proveedors', 'productos.idProveedor', 'proveedors.id')
                .innerJoin('cat_categorias', 'productos.idCategoria', 'cat_categorias.id')
                .where(stringWhere);
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
    async listarPorPrecio({ auth, params, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;
        const { desde, asta } = params;

        const usuario = await auth.getUser();

        try {
            data = await Database
                .select('productos.id as idProducto',
                    'productos.nombre as Producto',
                    'productos.descripcion as descripcionProducto',
                    'productos.descripcionCorta as descripcionCorta',
                    'productos.codigo as sku',
                    'productos.precio',
                    'proveedors.id as idProveedor',
                    'proveedors.nombre as Proveedor',
                    'cat_categorias.id as idCategoria',
                    'cat_categorias.descripcion as Categoria')
                .from('productos')
                .innerJoin('proveedors', 'productos.idProveedor', 'proveedors.id')
                .innerJoin('cat_categorias', 'productos.idCategoria', 'cat_categorias.id')
                .where({ 'productos.idEstado': 1, 'proveedors.idEstado': 1, 'cat_categorias.idEstado': 1 })
                .whereBetween('precio', [desde, asta])
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
    async registrar({ auth, request, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        const producto = new Producto();
        try {
            const usuario = await auth.getUser();

            const { idCatalogo, nopagina, idCategoria, nombre, codigo, descripcion, descripcionCorta, precio, oferta, idEstado } = request.all();
            producto.fill({
                idCatalogo,
                nopagina,
                idCategoria,
                nombre,
                codigo,
                descripcion,
                descripcionCorta,
                precio,
                oferta,
                idEstado
            });
            await usuario.productos().save(producto);
            respuesta = 'Producto registrado exitosamente'
            data = producto;
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
            const producto = await Producto.find(id);
            await producto.merge(request.only(['idCatalogo', 'idCategoria', 'nombre', 'codigo', 'descripcion', 'descripcionCorta', 'precio', 'oferta', 'nopagina', 'idEstado']));

            await producto.save();
            data = producto;
            respuesta = 'Producto actualizado exitosamente';
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

module.exports = ProductoController
