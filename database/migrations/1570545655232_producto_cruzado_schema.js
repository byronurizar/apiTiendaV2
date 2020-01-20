'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductoCruzadoSchema extends Schema {
  up () {
    this.create('producto_cruzados', (table) => {
      table.increments()
      table.integer('idProducto').unsigned().unique().references('id').inTable('productos')
      table.integer('idEstado').unsigned().references('id').inTable('cat_estados')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('producto_cruzados')
  }
}

module.exports = ProductoCruzadoSchema
