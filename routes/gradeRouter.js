import express from 'express'
import controller from '../controllers/gradeController.js'

const router = express()

router.post('/grade', controller.create)
router.get('/grade', controller.findAll)
router.get('/grade/:id', controller.findOne)
router.put('/grade/:id', controller.update)
router.delete('/grade/:id', controller.remove)
router.delete('/grade', controller.removeAll)

export default router
