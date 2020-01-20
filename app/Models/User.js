'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }
  estados(){
    return this.hasMany('App/Models/CatEstado')
  }
  generos(){
    return this.hasMany('App/Models/CatGenero')
  }
  departamentos(){
    return this.hasMany('App/Models/CatDepartamento')
  }
  municipios(){
    return this.hasMany('App/Models/CatMunicipio')
  }
  roles(){
    return this.hasMany('App/Models/CatRol')
  }
  categorias(){
    return this.hasMany('App/Models/CatCategoria')
  }
  proveedores(){
    return this.hasMany('App/Models/Proveedor')
  }
  telefonosProveedor(){
    return this.hasMany('App/Models/CatTelefonoProveedor')
  }
  productos(){
    return this.hasMany('App/Models/Producto')
  }
  infoAdicionalProductos(){
    return this.hasMany('App/Models/InfoAdicionalProducto')
  }
  etiquetas(){
    return this.hasMany('App/Models/CatEtiqueta')
  }
  etiquetasProductos(){
    return this.hasMany('App/Models/CatEtiquetaProducto')
  }
  tallas(){
    return this.hasMany('App/Models/TallaProducto')
  }
  stockProducto(){
    return this.hasMany('App/Models/StockProducto')
  }
  colores(){
    return this.hasMany('App/Models/CatColore')
  }
  imagenesProducto(){
    return this.hasMany('App/Models/ImagenProducto')
  }
  catalogos(){
    return this.hasMany('App/Models/Catalogo')
  }
  productosCruzados(){
    return this.hasMany('App/Models/ProductoCruzado')
  }
  detalleProductoCruzado(){
    return this.hasMany('App/Models/DetalleProductoCruzado')
  }
  personas(){
    return this.hasMany('App/Models/Persona')
  }
  telefonosPersona(){
    return this.hasMany('App/Models/TelefonoPersona')
  }
  direccionesPersona(){
    return this.hasMany('App/Models/DireccionPersona')
  }
  estadosPedido(){
    return this.hasMany('App/Models/CatEstadoPedido')
  }
  tiposPago(){
    return this.hasMany('App/Models/CatTipoPago')
  }
  pedidos(){
    return this.hasMany('App/Models/Pedido')
  }
  detallePedido(){
    return this.hasMany('App/Models/DetallePedido')
  }
  detalleTipoPago(){
    return this.hasMany('App/Models/DetalleTipoPago')
  }
  asingColorProducto(){
    return this.hasMany('App/Models/AsigColorProducto')
  }
  asingTallaProducto(){
    return this.hasMany('App/Models/AsigTallaProducto')
  }
}

module.exports = User
