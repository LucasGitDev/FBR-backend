import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Peca from 'App/Models/Peca'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class PecasController {
  public async create({ request, response }: HttpContextContract) {
    const postSchema = schema.create({
      nome: schema.string({ trim: true }, [rules.maxLength(255)]),
      descricaoCompleta: schema.string({ escape: true }, [rules.maxLength(1000)]),
      codigo: schema.string({ trim: true }, [rules.maxLength(255)]),
      valorEntrada: schema.number(),
      valorSaida: schema.number(),
      quantidade: schema.number(),
      quantidadeMinima: schema.number(),
      desconto: schema.number(),
      localizacao: schema.string({ trim: true }, [rules.maxLength(255)]),
      tipo: schema.string({ trim: true }, [rules.maxLength(255)]),
      descricao: schema.string({ escape: true }, [rules.maxLength(1000)]),
      data_ultima_remessa: schema.string(),
    })

    const payload: any = await request.validate({ schema: postSchema })
    payload.data_ultima_remessa = new Date(payload.data_ultima_remessa).toISOString().split('T')[0]

    const peca = await Peca.create(payload)
    return response.ok(peca)
  }

  public async readAll({}: HttpContextContract) {
    const pecas = await Peca.all()

    return pecas
  }

  public async readById({ request }: HttpContextContract) {
    const { id } = await request.get()
    const peca = await Peca.findOrFail(id)

    return peca
  }

  public async search({ request }: HttpContextContract) {
    const { search } = await request.get()

    const pecas = await Peca.query()
      .where('nome', 'ilike', `%${search}%`)
      .orWhere('descricao', 'ilike', `%${search}%`)
      .orWhere('codigo', 'ilike', `%${search}%`)
      .orWhere('localizacao', 'ilike', `%${search}%`)
      .orWhere('tipo', 'ilike', `%${search}%`)

    return pecas
  }

  public async update({ params }: HttpContextContract) {
    const peca = await Peca.findOrFail(params.id)

    return peca
  }

  public async delete({ params }: HttpContextContract) {
    const peca = await Peca.findOrFail(params.id)

    await peca.delete()

    return peca
  }
}
