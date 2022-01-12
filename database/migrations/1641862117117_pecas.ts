import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Pecas extends BaseSchema {
  protected tableName = 'pecas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome').notNullable()
      table.string('descricao').notNullable()
      table.text('descricao_completa')
      table.string('codigo').notNullable().unique() //A5DA41
      table.float('valor_entrada').notNullable()
      table.float('valor_saida').notNullable()
      table.integer('quantidade').notNullable()
      table.integer('quantidade_minima').notNullable()
      table.integer('desconto').notNullable()
      table.string('localizacao').notNullable() // Prateleira X - Coluna Y -> 15#3
      table.string('tipo').notNullable()
      table.date('data_ultima_remessa').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
