'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CatMunicipioSchema extends Schema {
  up () {
    this.create('cat_municipios', (table) => {
      table.increments()
      table.integer('idDepartamento').unsigned().references('id').inTable('cat_departamentos')
      table.string('descripcion', 100).notNullable().unique()
      table.integer('idEstado').unsigned().references('id').inTable('cat_estados')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('cat_municipios')
  }
}

module.exports = CatMunicipioSchema
