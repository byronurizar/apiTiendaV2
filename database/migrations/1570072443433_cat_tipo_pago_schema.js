'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CatTipoPagoSchema extends Schema {
  up () {
    this.create('cat_tipo_pagos', (table) => {
      table.increments()
      table.string('descripcion', 300).notNullable()
      table.boolean('esTipoDeposito').defaultTo(true)
      table.integer('idEstado').unsigned().references('id').inTable('cat_estados')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('cat_tipo_pagos')
  }
}

module.exports = CatTipoPagoSchema
