'use strict'
const Categoria = use('App/Models/CatCategoria');
const Database = use('Database');
class CategoriaController {
    async listarParaScraping({ auth,response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;
        const usuario = await auth.getUser();
        try {
            data = await Categoria.all();
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
    async listar({ auth, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        const usuario = await auth.getUser();
        try {
            //data = await Categoria.all();
            data = await Database
                .table('vistaCategorias')
            //await Database.close();
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

    async listarPorProveedor({ auth, params, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        const usuario = await auth.getUser();
        try {
            const { id } = params;
            data = await Database
                .raw(`select id as idCategoria,descripcion as categoria from cat_categorias
             where id in(
             select idCategoria from productos where idCatalogo in(
             select id from catalogos where idProveedor=${id}
             )
             )`)
            if (data.length > 0) {
                data = data[0];
            } else {
                data = null;
            }
            // // data=Buffer.from(JSON.stringify(data)).toString('base64')
            // var obj={
            //     codigo,
            //     error,
            //     respuesta,
            //     data
            // }
            // obj=Buffer.from(JSON.stringify(obj)).toString('base64')
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

        const categoria = new Categoria();
        try {
            const usuario = await auth.getUser();
            const { descripcion, idEstado } = request.all();
            categoria.fill({
                descripcion,
                idEstado
            });
            await usuario.categorias().save(categoria);
            respuesta = 'Categoria registrada exitosamente'
            data = categoria;
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
            const categoria = await Categoria.find(id);
            await categoria.merge(request.only(['descripcion', 'idEstado']));

            await categoria.save();
            data = categoria;
            respuesta = 'Categoria actualizada exitosamente';
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

module.exports = CategoriaController
