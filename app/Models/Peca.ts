import { DateTime } from 'luxon'
import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm'

export default class Peca extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public descricao: string

  @column()
  public descricaoCompleta: string

  @column()
  public codigo: string

  @column()
  public dataUltimaRemessa: DateTime

  @column()
  public valorEntrada: number

  @column()
  public valorSaida: number

  @column()
  public quantidade: number

  @column()
  public quantidadeMinima: number

  @column()
  public desconto: number

  @column()
  public localizacao: string

  @column()
  public tipo: string

  @computed()
  public get valorComDesconto(): number {
    return this.valorSaida - (this.valorSaida * this.desconto) / 100
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
