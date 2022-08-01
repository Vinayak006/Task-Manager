const model = require('./task')
const allTask = async (req, res) => {
    try{
        let task = await model.find({})
        if(!task[0]){
            return res.status(404).json(`No task found, create new`)
        }
       res.status(200).json({ task })
    }
    catch(err){
        res.status(500).json({  msg: err })
    }
}
const getTask = async (req, res) => {
    try{
        const { id: taskID } = req.params
        const task = await model.findOne({ _id: taskID })
        if(!task){
            return res.status(404).json({msg: `${taskID} not found`})
        }
        res.status(200).json({ task })
    }
    catch(err){
        res.status(500).json({  msg: err })
    }
}
const createTask = async (req, res) => {
    try{
        let task = await model.create(req.body)
        res.status(200).json({ task })
    }
    catch(err){
        res.status(500).json({msg:err})
    }
}
const updateTask = async (req, res) => {
    try{
        let { id: taskID } = req.params
        let task = await model.findOneAndUpdate({ _id: taskID }, req.body, {
            new: true,
            runValidators: true
        })
        if(!task){
            return res.status(404).json({ masg: `No task found`})
        }
        res.status(200).json({ task })
    }
    catch(err) {
        res.status(500).json({msg:err})
    }
}
const deleteTask = async (req, res) => {
    try{
        let { id: taskID } = req.params
        let task = await model.findOneAndDelete({ _id: taskID })
        if(!task){
            return res.status(404).json({msg: `${taskID} not found`})
        }
        res.status(200).json(`Task Deleted..`)
    }
    catch(err){
        res.status(500).json({msg:err})
    }
}
module.exports = {allTask, getTask, createTask, updateTask, deleteTask}
