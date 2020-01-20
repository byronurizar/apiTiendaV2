'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DetalleProductoCruzadoSchema extends Schema {
  up () {
    this.create('detalle_producto_cruzados', (table) => {
      table.increments()
      table.integer('idProductoCruzado').unsigned().references('id').inTable('producto_cruzados')
      table.integer('idProducto').unsigned().references('id').inTable('productos')
      table.integer('idEstado').unsigned().references('id').inTable('cat_estados')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('detalle_producto_cruzados')
  }
}

module.exports = DetalleProductoCruzadoSchema
