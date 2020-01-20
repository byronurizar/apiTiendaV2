'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DireccionPersonaSchema extends Schema {
  up () {
    this.create('direccion_personas', (table) => {
      table.increments()
      table.integer('idPersona').unsigned().references('id').inTable('personas')
      table.integer('idMunicipio').unsigned().references('id').inTable('cat_municipios')
      table.string('direccion', 500).notNullable()
      table.string('puntoReferencia', 500).notNullable()
      table.integer('idEstado').unsigned().references('id').inTable('cat_estados')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('direccion_personas')
  }
}

module.exports = DireccionPersonaSchema
