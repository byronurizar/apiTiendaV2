'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CatTelefonoProveedorSchema extends Schema {
  up () {
    this.create('cat_telefono_proveedors', (table) => {
      table.increments()
      table.integer('idProveedor').unsigned().references('id').inTable('proveedors')
      table.string('telefono', 100).notNullable().unique()
      table.integer('idEstado').unsigned().references('id').inTable('cat_estados')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('cat_telefono_proveedors')
  }
}

module.exports = CatTelefonoProveedorSchema
