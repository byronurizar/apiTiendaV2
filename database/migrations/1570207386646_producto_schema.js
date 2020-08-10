'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductoSchema extends Schema {
  up() {
    this.create('productos', (table) => {
      table.increments()
      table.integer('idCatalogo').unsigned().references('id').inTable('catalogos')
      table.integer('nopagina')//Nuevo campo
      table.integer('idCategoria').unsigned().references('id').inTable('cat_categorias')
      table.string('nombre', 100).notNullable()
      table.string('codigo', 100).notNullable().unique()
      table.string('descripcion', 1500)
      table.string('descripcionCorta', 500)
      table.decimal('precio').notNullable()
      table.decimal('oferta').defaultTo(0)
      table.integer('idEstado').unsigned().references('id').inTable('cat_estados')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down() {
    this.drop('productos')
  }
}

module.exports = ProductoSchema
