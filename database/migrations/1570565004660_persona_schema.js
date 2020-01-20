'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PersonaSchema extends Schema {
  up() {
    this.create('personas', (table) => {
      table.increments()
      table.string('primerNombre', 100).notNullable()
      table.string('segundoNombre', 100)
      table.string('otrosNombres', 100)
      table.string('primerApellido', 100).notNullable()
      table.string('segundoApellido', 100)
      table.string('otrosApellidos', 100)
      table.date('fechaNacimiento').notNullable()
      table.integer('idGenero').unsigned().references('id').inTable('cat_generos')
      table.string('correo', 100).notNullable()
      table.integer('idMunicipio').unsigned().references('id').inTable('cat_municipios')
      table.integer('idEstado').unsigned().references('id').inTable('cat_estados')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down() {
    this.drop('personas')
  }
}

module.exports = PersonaSchema
