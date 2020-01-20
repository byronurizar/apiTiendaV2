'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CatEstadoSchema extends Schema {
  up () {
    this.create('cat_estados', (table) => {
      table.increments()
      table.string('descripcion', 100).notNullable().unique()
      table.boolean('activo').defaultTo(true)
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('cat_estados')
  }
}

module.exports = CatEstadoSchema
