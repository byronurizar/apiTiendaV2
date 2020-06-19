'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MenuSchema extends Schema {
  up () {
    this.create('menus', (table) => {
      table.increments()
      table.integer('idpadre')
      table.string('descripcion', 200).notNullable().unique()
      table.string('href', 200)
      table.string('icono', 200)
      table.boolean('activo').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('menus')
  }
}

module.exports = MenuSchema
