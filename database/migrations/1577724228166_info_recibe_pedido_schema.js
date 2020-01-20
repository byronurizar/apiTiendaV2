'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InfoRecibePedidoSchema extends Schema {
  up () {
    this.create('info_recibe_pedidos', (table) => {
      table.increments()
      table.integer('idPedido').unsigned().references('id').inTable('pedidos')
      table.string('nombres', 100).notNullable()
      table.string('apellidos', 100).notNullable()
      table.string('telefonos', 100).notNullable()
      table.integer('idMunicipio').unsigned().references('id').inTable('cat_municipios')
      table.string('direccion', 200).notNullable()
      table.string('puntoReferencia', 200)
      table.timestamps()
    })
  }

  down () {
    this.drop('info_recibe_pedidos')
  }
}

module.exports = InfoRecibePedidoSchema
