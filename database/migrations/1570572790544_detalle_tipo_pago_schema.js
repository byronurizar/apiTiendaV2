'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DetalleTipoPagoSchema extends Schema {
  up () {
    this.create('detalle_tipo_pagos', (table) => {
      table.increments()
      table.integer('idTipoPago').unsigned().references('id').inTable('cat_tipo_pagos')
      table.string('nombreBanco', 300).notNullable()
      table.string('nombreCuenta', 300).notNullable()
      table.string('numeroCuenta', 300).notNullable()
      table.string('tipoCuenta', 300).notNullable()
      table.integer('idEstado').unsigned().references('id').inTable('cat_estados')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('detalle_tipo_pagos')
  }
}

module.exports = DetalleTipoPagoSchema
