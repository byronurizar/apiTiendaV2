'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CatEtiquetaSchema extends Schema {
  up () {
    this.create('cat_etiquetas', (table) => {
      table.increments()
      table.string('descripcion', 100).notNullable()
      table.integer('idEstado').unsigned().references('id').inTable('cat_estados')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('cat_etiquetas')
  }
}

module.exports = CatEtiquetaSchema
