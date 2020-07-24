'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProveedorSchema extends Schema {
  up () {
    this.create('proveedors', (table) => {
      table.increments()
      table.string('nombre', 100).notNullable().unique()
      table.string('descripcion', 500)
      table.string('direccion', 500).notNullable()
      table.integer('num_dias_minimo_ciudad').notNullable()
      table.integer('num_dias_maximo_ciudad').notNullable()
      table.integer('num_dias_minimo_interior').notNullable()
      table.integer('num_dias_maximo_interior').notNullable()
      table.string('observaciones', 500)
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('idEstado').unsigned().references('id').inTable('cat_estados')
      table.timestamps()
    })
  }

  down () {
    this.drop('proveedors')
  }
}

module.exports = ProveedorSchema
