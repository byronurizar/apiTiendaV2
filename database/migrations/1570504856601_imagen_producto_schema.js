'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImagenProductoSchema extends Schema {
  up () {
    this.create('imagen_productos', (table) => {
      table.increments()
      table.integer('idProducto').unsigned().references('id').inTable('productos')
      table.string('pathImagen', 100).notNullable()
      table.string('codigoImagen', 100).notNullable()
      table.boolean('esImagenPrincipal').defaultTo(true)
      table.integer('idEstado').unsigned().references('id').inTable('cat_estados')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('imagen_productos')
  }
}

module.exports = ImagenProductoSchema
