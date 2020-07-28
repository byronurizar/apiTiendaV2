'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PedidoSchema extends Schema {
  up () {
    this.create('pedidos', (table) => {
      table.increments()
      table.integer('idTipoPago').unsigned().references('id').inTable('cat_tipo_pagos')
      table.integer('idEstadoPedido').unsigned().references('id').inTable('cat_estado_pedidos')
      table.integer('idDireccionUsuario').unsigned().references('id').inTable('direccion_usuarios')
      table.string('observaciones', 500)
      table.integer('user_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('pedidos')
  }
}

module.exports = PedidoSchema
