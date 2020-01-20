'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CatalogoSchema extends Schema {
  up () {
    this.create('catalogos', (table) => {
      table.increments()
      table.integer('idProveedor').unsigned().references('id').inTable('proveedors')
      table.string('descripcion', 100).notNullable()
      table.integer('idEstado').unsigned().references('id').inTable('cat_estados')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('catalogos')
  }
}

module.exports = CatalogoSchema
