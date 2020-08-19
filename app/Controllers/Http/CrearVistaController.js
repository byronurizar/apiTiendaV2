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
            SELECT a.id,a.nombre,a.descripcion,a.direccion,b.descripcion AS idEstado,a.num_dias_minimo_ciudad,a.num_dias_maximo_ciudad,a.num_dias_minimo_interior,a.num_dias_maximo_interior,a.observaciones FROM proveedors a
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
            select a.id,a.codigo,a.nombre,a.descripcion,a.descripcionCorta,a.precio,a.oferta,(select Concat(pathImagen,codigoImagen) from imagen_productos where idProducto=a.id limit 1) as pathImagen,
            true as esImagenPrincipal,a.idCatalogo,a.idCategoria,c.descripcion as catalogo,d.nombre as proveedor,e.descripcion as categoria  from productos a
            inner join catalogos c
            on a.idCatalogo=c.id and c.idEstado=1
            inner join proveedors d
            on c.idProveedor=d.id and d.idEstado=1
            inner join cat_categorias e
            on a.idCategoria=e.id
            where a.idEstado=1 and c.idEstado=1 and e.idEstado=1;`);

            data=await Database
            .raw(`CREATE OR REPLACE VIEW vistaImagenesProducto
            AS
            SELECT id,idProducto,concat(pathImagen) AS pathImagen,codigoImagen,esImagenPrincipal,idEstado,user_id,created_at,updated_at FROM imagen_productos
            WHERE idEstado=1`);

            data=await Database
            .raw(`CREATE OR replace VIEW vistaInfoPedido
            as
            SELECT a.id,DATE_FORMAT(a.created_at,'%d/%m/%Y') AS Fecha,CONCAT(b.nombre,' ',b.apellido) AS Nombre,b.telefono,concat(b.direccion,',',e.descripcion,',',f.descripcion) as direccion,b.puntoReferencia,c.descripcion AS TipoPago,d.descripcion AS Estado,ifnull(observaciones,'') as observaciones,a.costoEnvio FROM pedidos a
            INNER JOIN direccion_usuarios b
            ON a.idDireccionUsuario=b.id
            INNER JOIN cat_tipo_pagos c
            ON a.idTipoPago=c.id
            INNER JOIN cat_estado_pedidos d
            ON a.idEstadoPedido=d.id
            inner join cat_municipios e
            on b.idMunicipio=e.id
            inner join cat_departamentos f
            on e.idDepartamento=f.id;`);

            data=await Database
            .raw(`CREATE OR replace VIEW vistaDetallePedido
            as
            SELECT  a.id,a.idPedido,b.id AS IdProducto,b.nombre AS Producto,f.nombre as proveedor,b.codigo,a.cantidad,(a.precio-a.descuento) AS Precio,
            case when(c.descripcion IS NULL) then 'N/A' ELSE c.descripcion END AS Talla,
            case when(d.descripcion IS NULL) then 'N/A' ELSE d.descripcion END AS Color,a.idEstado 
            FROM detalle_pedidos a
            INNER JOIN productos b
            ON a.idProducto=b.id
            left JOIN talla_productos c
            ON a.idTalla=c.id
            LEFT JOIN cat_colores d
            ON a.idTalla=d.id
            inner join catalogos e
            on b.idCatalogo=e.id
            inner join proveedors f
            on e.idProveedor=f.id;`);

            data=await Database
            .raw(`create or replace view menupublico
            as
            select concat('prov',id) as id,0 as idpadre,nombre as descripcion,'Soy proveedor' as href,'icono' as icono from proveedors where idEstado=1
            union all
            select CONCAT('cat',id) as id,concat('prov',idProveedor) as idpadre,descripcion,'soy catalogo' as href,'' as icono from catalogos where idEstado=1
            union all
            select distinct cat.id,concat('cat',prod.idCatalogo) as idpadre,cat.descripcion,concat('/comercio/productos/',prod.idCatalogo,'/',prod.idCategoria) as href,'' as icono from productos prod
            inner join cat_categorias cat
            on prod.idCategoria=cat.id and cat.idEstado=1 and prod.idEstado=1
            inner join catalogos ctlog
            on prod.idCatalogo=ctlog.id and ctlog.idEstado=1
            inner join proveedors prov
            on ctlog.idProveedor=prov.id and prov.idEstado=1;
            `);

            data=await Database
            .raw(`create or replace view vistaDireccionesUsuario
            as
            select a.user_id,a.nombre,a.apellido,a.telefono,a.id,a.idMunicipio,c.id as idDepartamento,a.direccion,a.puntoReferencia,d.descripcion as Estado,DATE_FORMAT(a.created_at,'%d/%m/%Y') as Creacion,c.descripcion as Departamento,b.descripcion as Municipio,a.idEstado from direccion_usuarios a
            inner join cat_municipios b
            on a.idMunicipio=b.id
            inner join cat_departamentos c
            on b.idDepartamento=c.id
            inner join cat_estados d
            on a.idEstado=d.id;
            `);

            data=await Database
            .raw(`create or replace view vistaPedidosUsuarios
            as
            select a.user_id,e.email,e.name,ifnull(e.proveedor,'') as proveedor,a.id as idPedido,DATE_FORMAT(a.created_at,'%d/%m/%Y') as fechaIngreso,c.descripcion as estado,
            (select sum(cantidad*precio) from detalle_pedidos where idPedido=a.id)+a.costoEnvio as total,a.costoEnvio,
            b.descripcion tipoPago,ifnull(a.observaciones,'') as observaciones,
            f.nombre,f.apellido,f.telefono,f.direccion,f.puntoReferencia,g.descripcion as municipio,h.descripcion as departamento,a.idEstadoPedido from pedidos a
            inner join cat_tipo_pagos b
            on a.idTipoPago=b.id
            inner join cat_estado_pedidos c
            on a.idEstadoPedido=c.id
            inner join users e
            on a.user_id=e.id
            inner join direccion_usuarios f
            on a.idDireccionUsuario=f.id
            inner join cat_municipios g
            on f.idMunicipio=g.id
            inner join cat_departamentos h
            on g.idDepartamento=h.id;
            `);

            data=await Database
            .raw(`create or replace view vistainfoadicionalsmartable
            as
            select a.id,a.idProducto,a.valor,b.descripcion as idTipoInfoAdicional,c.descripcion as idEstado from info_adicional_productos a
            inner join cat_tipo_info_adicionals b
            on a.idTipoInfoAdicional=b.id
            inner join cat_estados c
            on a.idEstado=c.id
            where a.idEstado in(1,2);
            `);


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
