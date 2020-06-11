'use strict'
const Database = use('Database');
class CrearVistaController {
    async crearVistas({ auth, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        const usuario = await auth.getUser();
        try {

            data = await Database
                .raw(`CREATE OR replace VIEW vistaCategorias 
                AS select a.id,a.descripcion,b.descripcion as idEstado 
                from cat_categorias a 
                inner join cat_estados b 
                on a.idEstado=b.id where a.idEstado in(1,2)`);

            data = await Database
                .raw(`CREATE OR REPLACE VIEW vistaDepartamentos as
                 SELECT a.id,a.descripcion,b.descripcion AS idEstado 
                FROM cat_departamentos a 
                INNER JOIN cat_estados b 
                ON a.idEstado=b.id WHERE a.idEstado IN(1,2)`);

            data = await Database
                .raw(`CREATE OR REPLACE VIEW vistaMunicipios AS 
                   SELECT a.id,a.descripcion,b.descripcion AS idDepartamento,c.descripcion AS idEstado 
                   FROM cat_municipios a INNER JOIN cat_departamentos b 
                   ON a.idDepartamento=b.id INNER JOIN cat_estados c 
                   ON a.idEstado=c.id WHERE a.idEstado IN(1,2)`);
            data = await Database
                .raw(`CREATE OR REPLACE VIEW vistaRoles
                    AS
                    SELECT a.id,a.descripcion,b.descripcion AS idEstado 
                    FROM cat_rols a INNER JOIN cat_estados b ON a.idEstado=b.id 
                    WHERE a.idEstado IN(1,2)`);

            data =await Database
            .raw(`CREATE OR REPLACE VIEW vistaProveedores
            AS
            SELECT a.id,a.nombre,a.descripcion,a.direccion,b.descripcion AS idEstado FROM proveedors a
            INNER JOIN cat_estados b
            ON a.idEstado=b.id
            WHERE a.idEstado IN(1,2)`);

            data=await Database 
            .raw(`CREATE OR REPLACE VIEW vistaTelefonosProveedor
            AS
            SELECT a.id,b.nombre as idProveedor,a.telefono,c.descripcion AS idEstado FROM cat_telefono_proveedors a 
            INNER JOIN proveedors b 
            ON a.idProveedor=b.id
            INNER JOIN cat_estados c
            ON a.idEstado=c.id
            WHERE a.idEstado IN(1,2)`);

            data=await Database
            .raw(`CREATE OR REPLACE VIEW vistaEtiquetas
            AS
            SELECT a.id,a.descripcion,b.descripcion AS idEstado FROM cat_etiquetas a
            INNER JOIN cat_estados b
            ON a.idEstado=b.id
            WHERE a.idEstado IN(1,2)
            `);

            data=await Database
            .raw(`CREATE OR REPLACE VIEW vistaTallas
            AS
            SELECT a.id,a.descripcion,b.descripcion AS idEstado FROM talla_productos a
            INNER JOIN cat_estados b
            ON a.idEstado=b.id
            WHERE a.idEstado IN(1,2)
            `);

            data=await Database
            .raw(`CREATE OR REPLACE VIEW vistaColores
            AS
            SELECT a.id,a.descripcion,b.descripcion AS idEstado FROM cat_colores a
            INNER JOIN cat_estados b
            ON a.idEstado=b.id
            WHERE a.idEstado IN(1,2)`);

            data=await Database
            .raw(`CREATE OR REPLACE VIEW vistaCatalogos
            AS
            SELECT a.id,a.descripcion,b.nombre AS idProveedor,c.descripcion AS idEstado,b.id as proveedorid FROM catalogos a
            INNER JOIN proveedors b
            ON a.idProveedor=b.id
            INNER JOIN cat_estados c
            ON a.idEstado=c.id
            WHERE a.idEstado IN(1,2)`);
            

            data=await Database
            .raw(`CREATE OR REPLACE VIEW vistaEstadoPedido 
            AS
            select a.id,a.descripcion,b.descripcion as idEstado from cat_estado_pedidos a
            inner join cat_estados b
            on a.idEstado=b.id
            where a.idEstado in(1,2)`);

            data=await Database
            .raw(`CREATE OR REPLACE VIEW vistaTiposdePago 
            AS
            select a.id,a.descripcion,a.esTipoDeposito,b.descripcion as idEstado from cat_tipo_pagos a
            inner join cat_estados b
            on a.idEstado=b.id
            where a.idEstado in(1,2)`);

            data=await Database
            .raw(`CREATE OR REPLACE VIEW vistaDetalleTipoPago
            AS
            select a.id,a.nombreBanco,b.descripcion as idTipoPago,a.nombreCuenta,a.numeroCuenta,a.tipoCuenta,c.descripcion as idEstado from detalle_tipo_pagos a
            inner join cat_tipo_pagos b
            on a.idTipoPago=b.id
            inner join cat_estados c
            on a.idEstado=c.id
            where a.idEstado in(1,2)`);

            data=await Database
            .raw(`CREATE OR REPLACE VIEW vistaColoresProducto
            AS
            select a.id,b.descripcion as idColor,c.descripcion as idEstado,a.idProducto as productoid from asig_color_productos a
            inner join cat_colores b
            on a.idColor=b.id
            inner join cat_estados c
            on a.idEstado=c.id
            where a.idEstado in(1,2) and b.idEstado in(1,2)`);


            data=await Database
            .raw(`CREATE OR REPLACE VIEW vistaTallasProducto
            AS
            select a.id,b.descripcion as idTalla,c.descripcion as idEstado,a.idProducto as productoid from asig_talla_productos a
            inner join talla_productos b
            on a.idTalla=b.id
            inner join cat_estados c
            on a.idEstado=c.id
            where a.idEstado in(1,2) and b.idEstado in(1,2)`);

            
            data=await Database
            .raw(`CREATE OR REPLACE VIEW vistaEtiquetasProducto
            AS
            select a.id,b.descripcion as idEtiqueta,c.descripcion as idEstado,a.idProducto as productoid from cat_etiqueta_productos a
            inner join cat_etiquetas b
            on a.idEtiqueta=b.id
            inner join cat_estados c
            on a.idEstado=c.id
            where a.idEstado in(1,2) and b.idEstado in(1,2)`);


            data=await Database
            .raw(`CREATE OR REPLACE VIEW vistaComercioProductos
            AS
            select a.id,a.nombre,a.descripcion,a.descripcionCorta,a.precio,a.oferta,Concat(b.pathImagen,b.codigoImagen) as pathImagen,b.esImagenPrincipal,a.idCatalogo  from productos a
            inner join imagen_productos b
            on a.id=b.idProducto
            where a.idEstado=1 and b.idEstado=1 and b.esImagenPrincipal=1`);

            data=await Database
            .raw(`CREATE OR REPLACE VIEW vistaImagenesProducto
            AS
            SELECT id,idProducto,concat(pathImagen) AS pathImagen,codigoImagen,esImagenPrincipal,idEstado,user_id,created_at,updated_at FROM imagen_productos
            WHERE idEstado=1`);

            data=await Database
            .raw(`CREATE OR replace VIEW vistaInfoPedido
            as
            SELECT a.id,a.created_at AS Fecha,CONCAT(b.nombres,' ',b.apellidos) AS Nombre,b.telefonos,b.direccion,b.puntoReferencia,c.descripcion AS TipoPago,d.descripcion AS Estado FROM pedidos a
            INNER JOIN info_recibe_pedidos b
            ON a.id=b.idPedido
            INNER JOIN cat_tipo_pagos c
            ON a.idTipoPago=c.id
            INNER JOIN cat_estado_pedidos d
            ON a.idEstadoPedido=d.id`);

            data=await Database
            .raw(`CREATE OR replace VIEW vistaDetallePedido
            as
            SELECT  a.idPedido AS id,b.id AS IdProducto,b.nombre AS Producto,b.codigo,a.cantidad,(a.precio-a.descuento) AS Precio,
            case when(c.descripcion IS NULL) then 'N/A' ELSE c.descripcion END AS Talla,
            case when(d.descripcion IS NULL) then 'N/A' ELSE d.descripcion END AS Color 
            FROM detalle_pedidos a
            INNER JOIN productos b
            ON a.idProducto=b.id
            left JOIN talla_productos c
            ON a.idTalla=c.id
            LEFT JOIN cat_colores d
            ON a.idTalla=d.id`);

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

module.exports = CrearVistaController
