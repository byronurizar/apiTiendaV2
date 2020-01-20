'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CatEtiquetaProductoSchema extends Schema {
  up() {
    this.create('cat_etiqueta_productos', (table) => {
      table.increments()
      table.integer('idProducto').unsigned().references('id').inTable('productos')
      table.integer('idEtiqueta').unsigned().references('id').inTable('cat_etiquetas')
      table.integer('idEstado').unsigned().references('id').inTable('cat_estados')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down() {
    this.drop('cat_etiqueta_productos')
  }
}

module.exports = CatEtiquetaProductoSchema
