'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AsigTallaProductoSchema extends Schema {
  up () {
    this.create('asig_talla_productos', (table) => {
      table.increments()
      table.integer('idProducto').unsigned().references('id').inTable('productos')
      table.integer('idTalla').unsigned().references('id').inTable('talla_productos')
      table.integer('idEstado').unsigned().references('id').inTable('cat_estados')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('asig_talla_productos')
  }
}

module.exports = AsigTallaProductoSchema
