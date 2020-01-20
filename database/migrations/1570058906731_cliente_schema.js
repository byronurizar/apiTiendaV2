'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClienteSchema extends Schema {
  up () {
    this.create('clientes', (table) => {
      table.increments()
      table.string('primerNombre', 50).notNullable()
      table.string('segundoNombre', 50)
      table.string('otrosNombre', 50)
      table.string('primerApellido', 50).notNullable()
      table.string('segundoApellido', 50)
      table.string('apellidodeCasada', 50).notNullable()
      table.datetime('fechaNacimiento').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('clientes')
  }
}

module.exports = ClienteSchema
