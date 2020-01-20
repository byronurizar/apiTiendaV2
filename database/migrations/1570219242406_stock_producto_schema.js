'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StockProductoSchema extends Schema {
  up () {
    this.create('stock_productos', (table) => {
      table.increments()
      table.integer('idProducto').unsigned().references('id').inTable('productos')
      table.integer('idTalla').defaultTo(0)
      table.integer('idColor').defaultTo(0)
      table.integer('stockDisponible').defaultTo(0)
      table.integer('idEstado').unsigned().references('id').inTable('cat_estados')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('stock_productos')
  }
}

module.exports = StockProductoSchema
