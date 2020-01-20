'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TelefonoPersonaSchema extends Schema {
  up () {
    this.create('telefono_personas', (table) => {
      table.increments()
      table.integer('idPersona').unsigned().references('id').inTable('personas')
      table.string('telefono', 20).notNullable().unique()
      table.integer('idEstado').unsigned().references('id').inTable('cat_estados')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('telefono_personas')
  }
}

module.exports = TelefonoPersonaSchema
