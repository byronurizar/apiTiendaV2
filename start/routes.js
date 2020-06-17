'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

 Route.on('/').render('welcome')

// Route.get('listar', 'PruebaController.listar');
// Route.post('registro', 'UsuarioController.store');
// Route.post('token', 'UsuarioController.getToken');
//   //Estados
//   Route.post('estados/registro', 'EstadoController.registrar');
//   Route.patch('estados/actualizar/:id', 'EstadoController.actualizar');
//   Route.delete('estados/eliminar/:id', 'EstadoController.eliminar');
//   Route.get('estados/listar', 'EstadoController.listar');

// Route.get('/prueba', () => {
//     return { greeting: 'Hello world in JSON' }
//   })


Route.group(() => {
  //Usuarios
  Route.post('usuario/registronuevo', 'UsuarioController.registro');

  Route.post('usuario/registro', 'UsuarioController.store');
  Route.post('usuario/login', 'UsuarioController.login');
  Route.post('usuario/registrarUsuario', 'UsuarioController.registrarUsuario');

  //Estados
  Route.post('estados/registro', 'EstadoController.registrar');
  Route.patch('estados/actualizar/:id', 'EstadoController.actualizar');
  Route.delete('estados/eliminar/:id', 'EstadoController.eliminar');
  Route.get('estados/listar', 'EstadoController.listar');

  //Generos
  Route.post('generos/registro', 'GeneroController.registrar');
  Route.patch('generos/actualizar/:id', 'GeneroController.actualizar');
  Route.get('generos/listar', 'GeneroController.listar');

  //Departamentos
  Route.post('departamentos/registro', 'DepartamentoController.registrar');
  Route.patch('departamentos/actualizar/:id', 'DepartamentoController.actualizar');
  Route.get('departamentos/listar', 'DepartamentoController.listar');

  //Municipios
  Route.post('municipios/registro', 'MunicipioController.registrar');
  Route.patch('municipios/actualizar/:id', 'MunicipioController.actualizar');
  Route.get('municipios/listar', 'MunicipioController.listar');
  Route.get('municipios/listar/departamento/:id', 'MunicipioController.municipiosDepartamento');

  //Roles
  Route.post('roles/registro', 'RolController.registrar');
  Route.patch('roles/actualizar/:id', 'RolController.actualizar');
  Route.get('roles/listar', 'RolController.listar');

  //Categorias
  Route.post('categorias/registro', 'CategoriaController.registrar');
  Route.patch('categorias/actualizar/:id', 'CategoriaController.actualizar');
  Route.get('categorias/listar', 'CategoriaController.listar');
  Route.get('categorias/listarproveedor/:id', 'CategoriaController.listarPorProveedor');

  //Proveedores
  Route.post('proveedores/registro', 'ProveedorController.registrar');
  Route.patch('proveedores/actualizar/:id', 'ProveedorController.actualizar');
  Route.get('proveedores/listar', 'ProveedorController.listar');

  //Teléfono Proveedor
  Route.post('proveedores/telefonos/registro', 'TelefonoProveedorController.registrar');
  Route.patch('proveedores/telefonos/actualizar/:id', 'TelefonoProveedorController.actualizar');
  Route.get('proveedores/telefonos/listar/:id?', 'TelefonoProveedorController.listar');

  //Etiquetas
  Route.post('etiquetas/registro', 'EtiquetaController.registrar');
  Route.patch('etiquetas/actualizar/:id', 'EtiquetaController.actualizar');
  Route.get('etiquetas/listar', 'EtiquetaController.listar');

  //Tallas
  Route.post('tallas/registro', 'TallaProductoController.registrar');
  Route.patch('tallas/actualizar/:id', 'TallaProductoController.actualizar');
  Route.get('tallas/listar', 'TallaProductoController.listar');
  Route.get('tallas/listar/producto/:id', 'TallaProductoController.tallaProducto');

  //Colores
  Route.post('colores/registro', 'CatColoreController.registrar');
  Route.patch('colores/actualizar/:id', 'CatColoreController.actualizar');
  Route.get('colores/listar', 'CatColoreController.listar');
  Route.get('colores/listar/producto/:id', 'CatColoreController.coloresProducto');

  //Catalogo
  Route.post('catalogos/registro', 'CatalogoController.registrar');
  Route.patch('catalogos/actualizar/:id', 'CatalogoController.actualizar');
  Route.get('catalogos/listar/:id?', 'CatalogoController.listar');

  //Estado pedido
  Route.post('estadopedido/registro', 'CatEstadoPedidoController.registrar');
  Route.patch('estadopedido/actualizar/:id', 'CatEstadoPedidoController.actualizar');
  Route.get('estadopedido/listar', 'CatEstadoPedidoController.listar');

  //Tipo Pago
  Route.post('tipopago/registro', 'CatTipoPagoController.registrar');
  Route.patch('tipopago/actualizar/:id', 'CatTipoPagoController.actualizar');
  Route.get('tipopago/listar', 'CatTipoPagoController.listar');

  //Detalle de tipo pago
  Route.post('tipopago/detalle/registro', 'DetalleTipoPagoController.registrar');
  Route.patch('tipopago/detalle/actualizar/:id', 'DetalleTipoPagoController.actualizar');
  Route.get('tipopago/detalle/listar', 'DetalleTipoPagoController.listar');


  //Persona
  Route.post('personas/registro', 'PersonaController.registrar');
  Route.patch('personas/actualizar/:id', 'PersonaController.actualizar');
  Route.get('personas/listar', 'PersonaController.listar');

  //Persona Telefonos
  Route.post('personas/telefonos/registro', 'TelefonoPersonaController.registrar');
  Route.patch('personas/telefonos/actualizar/:id', 'TelefonoPersonaController.actualizar');
  Route.get('personas/telefonos/listar', 'TelefonoPersonaController.listar');
  Route.get('personas/telefonos/listar/persona/:id', 'TelefonoPersonaController.telefonosPersona');

  //Persona Direccion
  Route.post('personas/direcciones/registro', 'DireccionPersonaController.registrar');
  Route.patch('personas/direcciones/actualizar/:id', 'DireccionPersonaController.actualizar');
  Route.get('personas/direcciones/listar', 'DireccionPersonaController.listar');
  Route.get('personas/direcciones/listar/persona/:id', 'DireccionPersonaController.direccionesPersona');

  //Productos
  Route.post('productos/registro', 'ProductoController.registrar');
  Route.patch('productos/actualizar/:id', 'ProductoController.actualizar');
  Route.get('productos/listar', 'ProductoController.listar');
  Route.get('productos/listar/:tipo/:id', 'ProductoController.listar'); //tipo : proveedor o categoria
  Route.get('productos/listar/precio/:desde/:asta', 'ProductoController.listarPorPrecio');
  Route.get('productos/categoria/:idCatalogo/:idProducto/', 'ProductoController.listarProductoPorCategoria');
  

  Route.get('productos/comercio/listar', 'ProductoController.comercioListar');
  Route.get('productos/comercio/infoproducto/:id', 'ProductoController.infoProducto');

  //Info Adicional Producto
  Route.post('productos/infoadicional/registro', 'InfoAdicionalProductoController.registrar');
  Route.patch('productos/infoadicional/actualizar/:id', 'InfoAdicionalProductoController.actualizar');
  Route.get('productos/infoadicional/listar/producto/:id', 'InfoAdicionalProductoController.listar');

  //Etiquetas a Producto
  Route.post('etiquetasproducto/registro', 'EtiquetaProductoController.registrar');
  Route.patch('etiquetasproducto/actualizar/:id', 'EtiquetaProductoController.actualizar');
  Route.get('etiquetasproducto/listar/producto/:id', 'EtiquetaProductoController.listar');


  //Stock Producto
  Route.post('productos/stock/registro', 'StockProductoController.registrar');
  Route.patch('productos/stock/actualizar/:id', 'StockProductoController.actualizar');
  Route.get('productos/stock/listar', 'StockProductoController.listar');

  //Imagenes Producto
  Route.post('productos/imagenes/registro', 'ImagenProductoController.registrar');
  Route.patch('productos/imagenes/actualizar/:id', 'ImagenProductoController.actualizar');
  Route.get('productos/imagenes/listar/:id', 'ImagenProductoController.listar');
  Route.get('productos/imagenes/producto/:id', 'ImagenProductoController.imagenesProducto');
  Route.post('cargar', 'ImagenProductoController.cargarImagen');

  //Asignación de colores a producto
  Route.post('productos/asigcolor/registro', 'AsigColorProductoController.registrar');
  Route.patch('productos/asigcolor/actualizar/:id', 'AsigColorProductoController.actualizar');
  Route.get('productos/asigcolor/listar/:id', 'AsigColorProductoController.listar');

  //Asignación de tallas a producto
  Route.post('productos/asigtalla/registro', 'AsigTallaProductoController.registrar');
  Route.patch('productos/asigtalla/actualizar/:id', 'AsigTallaProductoController.actualizar');
  Route.get('productos/asigtalla/listar/:id', 'AsigTallaProductoController.listar');


  //Producto Cruzado
  Route.post('productoscruzados/registro', 'ProductoCruzadoController.registrar');
  Route.patch('productoscruzados/actualizar/:id', 'ProductoCruzadoController.actualizar');
  Route.get('productoscruzados/listar/producto/:idProducto', 'ProductoCruzadoController.listarPorProducto');

  //Detalle Producto Cruzado
  Route.post('productoscruzados/detalle/registro', 'DetalleProductoCruzadoController.registrar');
  Route.patch('productoscruzados/detalle/actualizar/:id', 'DetalleProductoCruzadoController.actualizar');
  Route.get('productoscruzados/detalle/listar', 'DetalleProductoCruzadoController.listar');
  Route.get('productoscruzados/detalle/listar/producto/:idProducto', 'DetalleProductoCruzadoController.productosCruzadosporProducto');


  //Pedido
  Route.post('pedido/registro', 'PedidoController.registrar');
  Route.patch('pedido/actualizar/:id', 'PedidoController.actualizar');
  Route.get('pedido/listar', 'PedidoController.listar');
  Route.get('pedido/infopedido/:id', 'PedidoController.listarInfoDetallePedido');
  

  //Detalle Pedido
  Route.post('pedido/detalle/registro', 'DetallePedidoController.registrar');
  Route.patch('pedido/detalle/actualizar/:id', 'DetallePedidoController.actualizar');
  Route.get('pedido/detalle/listar', 'DetallePedidoController.listar');


  //Recibe pedido
  Route.post('pedido/recibe/registro', 'InfoRecibePedidoController.registrar');
  Route.get('pedido/detalle/:id', 'InfoRecibePedidoController.detallepedido');

  //Configuracion
  Route.get('confi/vistas', 'CrearVistaController.crearVistas');

}).prefix('apiStore/v1/');

//Agregar que los productos estan amarrados a un catalogo y analizar lo de varios prdoductos en una imagen

