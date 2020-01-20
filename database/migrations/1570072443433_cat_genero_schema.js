'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CatGeneroSchema extends Schema {
  up () {
    this.create('cat_generos', (table) => {
      table.increments()
      table.string('descripcion', 100).notNullable().unique()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('cat_generos')
  }
}

module.exports = CatGeneroSchema
