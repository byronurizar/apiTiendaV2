'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AsigColorProductoSchema extends Schema {
  up () {
    this.create('asig_color_productos', (table) => {
      table.increments()
      table.integer('idProducto').unsigned().references('id').inTable('productos')
      table.integer('idColor').unsigned().references('id').inTable('cat_colores')
      table.integer('idEstado').unsigned().references('id').inTable('cat_estados')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('asig_color_productos')
  }
}

module.exports = AsigColorProductoSchema
