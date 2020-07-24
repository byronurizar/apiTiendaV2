'use strict'
const Menu = use('App/Models/Menu');
const Database = use('Database');
class MenuController {
    async registrar({ auth, request, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;


        try {
            const usuario = await auth.getUser();
            const { listaMenu } = request.all();
            const nuevoMenu = async (newFila) => {
                let { idpadre, descripcion, href, icono } = newFila;
                let menu = await Menu.create({
                    idpadre,
                    descripcion,
                    href,
                    icono
                });
                return menu;
            }
            var responseData = new Array();

            for (let fila of listaMenu) {
                let menuReg = await nuevoMenu(fila);
                responseData.push(menuReg.$attributes);
            }
            data = responseData;
            respuesta = 'Menu registrado exitosamente';
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
        let esMenuPublico = false;
        try {
            const existeToken = await auth.getUser();
            let idRol = existeToken.$attributes.idRol;
            if (idRol !== 1) {
                codigo=2;
                data = await Database
                .table('menupublico');
                esMenuPublico = true;
            }
        }
        catch (ex) {
            codigo=2;
            esMenuPublico = true;
            data = await Database
            .table('menupublico');
        }

        if (!esMenuPublico) {
            console.log("Entro en ");
            try {
                const usuario = await auth.getUser();
                data = await Database
                    .table('menus');

                //await Database.close();
            } catch (err) {
                codigoHttp = 500;
                codigo = -1;
                error = err.message;
                respuesta = 'Ocurrió un error al realizar la acción solicitada';
                data = null;
            }
        }

        return response.status(codigoHttp).json({
            codigo,
            error,
            respuesta,
            data
        });
    }
}

module.exports = MenuController
