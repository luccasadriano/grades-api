import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import router from './routes/gradeRouter.js'

import { db } from './models/index.js'

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("conectado ao MongoDB com sucesso")
  } catch (error) {
    process.exit()
  }
})()

const app = express()

//define o dominio de origem para consumo do servico
app.use(bodyParser.json())
app.use(router)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  cors({
    origin: 'http://localhost:8080',
  })
)

app.get('/', (req, res) => {
  res.send('API em execucao')
})

app.listen(process.env.PORT || 8081, () => {})
