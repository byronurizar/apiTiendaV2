'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CatEstadoPedidoSchema extends Schema {
  up () {
    this.create('cat_estado_pedidos', (table) => {
      table.increments()
      table.string('descripcion', 100).notNullable().unique()
      table.integer('idEstado').unsigned().references('id').inTable('cat_estados')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('cat_estado_pedidos')
  }
}

module.exports = CatEstadoPedidoSchema
