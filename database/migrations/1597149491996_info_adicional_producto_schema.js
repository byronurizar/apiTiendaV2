'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InfoAdicionalProductoSchema extends Schema {
  up() {
    this.create('info_adicional_productos', (table) => {
      table.increments()
      table.integer('idProducto').unsigned().references('id').inTable('productos')
      table.integer('idTipoInfoAdicional').unsigned().references('id').inTable('cat_tipo_info_adicionals')
      table.string('valor', 1000).notNullable()
      table.integer('idEstado').unsigned().references('id').inTable('cat_estados')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down() {
    this.drop('info_adicional_productos')
  }
}

module.exports = InfoAdicionalProductoSchema
