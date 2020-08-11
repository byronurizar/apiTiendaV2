'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CatTipoInfoAdicionalSchema extends Schema {
  up () {
    this.create('cat_tipo_info_adicionals', (table) => {
      table.increments()
      table.string('descripcion', 100).notNullable().unique()
      table.integer('idEstado').unsigned().references('id').inTable('cat_estados')
      table.timestamps()
    })
  }

  down () {
    this.drop('cat_tipo_info_adicionals')
  }
}

module.exports = CatTipoInfoAdicionalSchema
