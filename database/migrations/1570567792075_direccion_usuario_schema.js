'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DireccionUsuarioSchema extends Schema {
  up () {
    this.create('direccion_usuarios', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('nombre', 80).notNullable()
      table.string('apellido', 80).notNullable()
      table.string('telefono', 80).notNullable()
      table.integer('idMunicipio').unsigned().references('id').inTable('cat_municipios')
      table.string('direccion', 500).notNullable()
      table.string('puntoReferencia', 500).notNullable()
      table.integer('idEstado').unsigned().references('id').inTable('cat_estados')
      table.timestamps()
    })
  }

  down () {
    this.drop('direccion_usuario')
  }
}

module.exports = DireccionUsuarioSchema
