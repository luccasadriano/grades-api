import { db } from '../models/index.js'
import { logger } from '../config/logger.js'

const Student = db.students

const create = async (req, res) => {
  const { name, subject, type, value } = req.body

  const student = new Student({
    name: name,
    subject: subject,
    type: type,
    value: value
  })

  try {

    const data = await student.save()

    res.send({ message: 'Grade inserido com sucesso' })
    logger.info(`POST /grade - ${JSON.stringify()}`)
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' })
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`)
  }
}

const findAll = async (req, res) => {
  const { id, name } = req.query

  //condicao para o filtro no findAll
  // var condition = name
  //   ? { name: { $regex: new RegExp(name), $options: 'i' } }
  //   : {}

  try {

    const data = await Student.find()

    if (!data) {
      res.status(400).send({ message: `Id: ${id}, não encontrado ` })
    }

    res.send(data)

    logger.info(`GET /grade`)
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' })
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`)
  }
}

const findOne = async (req, res) => {
  const id = req.params.id

  try {

    const data = await Student.findOne({ _id: id })

    if (!data) {
      res.status(400).send({ message: `Id: ${id}, não encontrado ` })
    }
    res.send(data)

    logger.info(`GET /grade - ${id}`)
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar a Grade id: ' + id })
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`)
  }
}

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    })
  }

  const id = req.params.id

  try {

    const data = await Student.findByIdAndUpdate({ _id: id }, req.body)

    if (!data) {
      res.status(400).send({ message: `Id: ${id}, não encontrado ` })
    }

    const retorn = await Student.findOne({ _id: id })

    res.send(retorn)

    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`)
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id })
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`)
  }
}

const remove = async (req, res) => {
  const id = req.params.id

  try {

    const data = await Student.findByIdAndDelete({ _id: id })

    if (!data) {
      res.status(400).send({ message: `Id: ${id}, não encontrado ` })
    }

    res.send(data)

    logger.info(`DELETE /grade - ${id}`)
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id })
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`)
  }
}

const removeAll = async (req, res) => {

  try {

    const data = await Student.deleteMany()

    res.status(200).send(data)
    logger.info(`DELETE /grade`)
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' })
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`)
  }
}

export default { create, findAll, findOne, update, remove, removeAll }
