const express = require('express')
const router = express.Router()
const {allTask, getTask, createTask, updateTask, deleteTask} = require('./controllers')

router.route('/').get(allTask).post(createTask)
router.route('/:id').get(getTask).put(updateTask).delete(deleteTask)

module.exports = router
